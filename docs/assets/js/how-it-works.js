// How It Works: animated Smart Motor on the home page (markup in _layouts/home.html)
(() => {
  const root = document.querySelector('.hiw');
  if (!root) return;
  const $ = (id) => root.querySelector('#hiw-' + id);

  // Step text lives in _data/steps.yml and arrives on the tab buttons as data attributes
  const DURATIONS = { setup: 5200, train: 9000, play: 10000, build: 8000 };
  const STEPS = [...root.querySelectorAll('.hiw-tab')].map((tab) => ({
    key: tab.dataset.key, title: tab.dataset.title, text: tab.dataset.text, dur: DURATIONS[tab.dataset.key],
  }));

  // Trained examples: sensor reading (0-100) -> motor angle
  const TRAIN = [{ s: 20, a: -45 }, { s: 80, a: 45 }];
  const BUILD = [{ s: 25, a: 0 }, { s: 75, a: 90 }];   // far = door closed, close = door open

  const clamp01 = (x) => Math.max(0, Math.min(1, x));
  const ease = (x) => { x = clamp01(x); return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2; };
  const seg = (t, a, b) => ease((t - a) / (b - a));
  const lerp = (a, b, k) => a + (b - a) * k;
  const nearest = (pts, s) => pts.reduce((best, p) => (Math.abs(p.s - s) < Math.abs(best.s - s) ? p : best));

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let step = 0;
  let t0 = performance.now();
  let autoplay = !reduceMotion;
  let userSensor = null;      // set when someone drags the slider
  let angle = 0;              // current motor angle (eased in Play/Build)
  let last = performance.now();
  let visible = true;

  // ---------- Scene timelines: (t in ms) -> what the device looks like ----------
  function scene(key, t) {
    if (key === 'setup') {
      return {
        callout: callout('setup', t),
        cable: seg(t, 300, 1500), flash: t > 1500 && t < 1850,
        power: seg(t, 2000, 2350), screen: t < 2600 ? 'off' : t < 3900 ? 'splash' : 'plot',
        sensor: 50, angle: 0, points: [], mode: 'setup',
      };
    }
    if (key === 'train') {
      let s = lerp(50, TRAIN[0].s, seg(t, 300, 1400));
      let a = lerp(0, TRAIN[0].a, seg(t, 1600, 2900));
      let points = [];
      let press = -1;
      if (t > 3200) { points = [TRAIN[0]]; press = t - 3200; }
      if (t > 4300) {
        s = lerp(TRAIN[0].s, TRAIN[1].s, seg(t, 4300, 5400));
        a = lerp(TRAIN[0].a, TRAIN[1].a, seg(t, 5600, 6900));
      }
      if (t > 7200) { points = TRAIN; press = t - 7200; }
      return { cable: 1, power: 1, screen: 'plot', sensor: s, angle: a, points, press, mode: 'train', callout: callout('train', t) };
    }
    if (key === 'play') {
      const s = userSensor ?? 50 - 42 * Math.cos((t / 5000) * 2 * Math.PI);
      return { cable: 1, power: 1, screen: 'plot', sensor: s, target: nearest(TRAIN, s).a, points: TRAIN, mode: 'play', callout: callout('play', t) };
    }
    // build: readings swing between low and high and pause at each end
    const s = 50 - 42 * Math.tanh(3 * Math.cos((t / 4000) * 2 * Math.PI));
    return { cable: 1, power: 1, screen: 'plot', sensor: s, target: nearest(BUILD, s).a, points: BUILD, mode: 'build' };
  }

  // Callouts: [from, to, label, targetX, targetY, bubbleX, bubbleY], placed right next to the part
  const SENSE = [501, 206, 501, 168], KNOB = [302, 148, 392, 112], SAVE = [302, 192, 396, 168];
  const CALLOUTS = {
    setup: [[200, 1700, 'Plug in a sensor', 334, 256, 478, 166], [1800, 2700, 'Switch on', 177, 258, 252, 226]],
    train: [[200, 1500, '1. Set the sensor', ...SENSE], [1500, 3000, '2. Turn the knob', ...KNOB], [3000, 4100, '3. Press to save', ...SAVE],
            [4200, 5500, '1. Set the sensor', ...SENSE], [5500, 7000, '2. Turn the knob', ...KNOB], [7000, 8300, '3. Press to save', ...SAVE]],
    play:  [[0, 1e9, 'Closest dot wins', 222, 206, 240, 234]],
    build: [],
  };
  function callout(key, t) {
    return (CALLOUTS[key] || []).find(([a, b]) => t >= a && t < b);
  }

  // ---------- Drawing ----------
  const px = (s) => 182 + s * 0.84;                                   // sensor -> screen x
  const pyTrain = (a) => 194 - ((a + 60) / 120) * 52;                 // -60..60 deg -> screen y
  const pyBuild = (a) => 194 - (a / 90) * 52;                         // door closed (0) low, open (90) high
  let pointsKey = '';
  let lastCallout = '';

  function draw(st) {
    const py = st.mode === 'build' ? pyBuild : pyTrain;

    $('cable').setAttribute('stroke-dashoffset', 1 - st.cable);
    $('port-flash').setAttribute('opacity', st.flash ? .9 : 0);

    $('switch-thumb').setAttribute('cy', lerp(269, 249, st.power));
    $('switch-track').setAttribute('fill', st.power > .5 ? '#2e8540' : '#c9d1dc');
    $('switch-label').textContent = st.power > .5 ? 'ON' : 'OFF';

    $('screen-splash').setAttribute('opacity', st.screen === 'splash' ? 1 : 0);
    $('screen-plot').setAttribute('opacity', st.screen === 'plot' ? 1 : 0);

    $('gauge').setAttribute('width', Math.max(8, 86 * st.sensor / 100));

    // saved points
    const key = st.mode + st.points.length;
    if (key !== pointsKey) {
      pointsKey = key;
      $('points').innerHTML = st.points
        .map((p) => `<circle cx="${px(p.s)}" cy="${py(p.a)}" r="4" fill="#4fb3ff"/>`).join('');
    }

    // live cursor while training; nearest-point ring + scan line while playing
    const training = st.mode === 'train';
    $('cursor').setAttribute('opacity', training ? 1 : 0);
    $('cursor').setAttribute('x', px(st.sensor) - 4);
    $('cursor').setAttribute('y', py(angle) - 4);
    const playing = st.mode === 'play' || st.mode === 'build';
    $('scan').setAttribute('opacity', playing ? 1 : 0);
    $('scan').setAttribute('x1', px(st.sensor));
    $('scan').setAttribute('x2', px(st.sensor));
    if (playing) {
      const n = nearest(st.points, st.sensor);
      $('near').setAttribute('cx', px(n.s));
      $('near').setAttribute('cy', py(n.a));
    }
    $('near').setAttribute('opacity', playing ? 1 : 0);

    // motor hub: marker on the top ellipse (0 deg = facing the viewer)
    const rad = angle * Math.PI / 180;
    const mx = 240 + 44 * Math.sin(rad), my = 90 + 11 * Math.cos(rad);
    $('hub-line').setAttribute('x2', mx);
    $('hub-line').setAttribute('y2', my);
    $('hub-dot').setAttribute('cx', mx);
    $('hub-dot').setAttribute('cy', my);
    $('knob').setAttribute('transform', `rotate(${training ? angle * 2 : 0})`);

    // button press + ripple
    const pr = st.press ?? -1;
    const pressing = pr >= 0 && pr < 450;
    $('btn').style.transform = pressing && pr < 160 ? 'scale(.86)' : '';
    $('ripple').setAttribute('opacity', pressing ? 1 - pr / 450 : 0);
    $('ripple').setAttribute('r', 18 + (pressing ? pr / 450 : 0) * 22);

    // build mode: a door hinged on the hub, opened by a hand near the distance sensor
    const build = st.mode === 'build';
    $('build').setAttribute('opacity', build ? 1 : 0);
    $('door').setAttribute('opacity', build ? 1 : 0);
    $('hand').setAttribute('opacity', build ? 1 : 0);
    $('hub-marker').setAttribute('opacity', build ? 0 : 1);
    $('sensor-label').textContent = build ? 'Distance' : 'Sensor';
    if (build) {
      // door swings back around the vertical hinge; depth is foreshortened like the hub ellipse
      const L = 76, fx = 240 + L * Math.cos(rad), dy = -L * Math.sin(rad) * (13 / 50);
      $('door-panel').setAttribute('points', `240,86 240,24 ${fx},${24 + dy} ${fx},${86 + dy}`);
      $('door-knob').setAttribute('cx', 240 + (L - 12) * Math.cos(rad));
      $('door-knob').setAttribute('cy', 58 + dy * (L - 12) / L);
      $('hand').setAttribute('transform', `translate(496 ${lerp(124, 168, st.sensor / 100)})`);
    }

    // callout bubble: sits in the open space above the sensor, leader line to the target
    const c = st.callout;
    $('callout').setAttribute('opacity', c ? 1 : 0);
    if (c && c[2] !== lastCallout) {
      lastCallout = c[2];
      const [, , label, tx, ty, cx, cy] = c;
      const w = label.length * 8 + 28;
      $('callout-text').textContent = label;
      $('callout-text').setAttribute('x', cx);
      $('callout-text').setAttribute('y', cy + 5);
      $('callout-box').setAttribute('x', cx - w / 2);
      $('callout-box').setAttribute('width', w);
      $('callout-box').setAttribute('y', cy - 15);
      $('callout-line').setAttribute('x1', cx);
      $('callout-line').setAttribute('y1', cy);
      $('callout-line').setAttribute('x2', tx);
      $('callout-line').setAttribute('y2', ty);
      $('callout-dot').setAttribute('cx', tx);
      $('callout-dot').setAttribute('cy', ty);
    }
    if (!c) lastCallout = '';

    $('s').textContent = Math.round(st.sensor);
    if (st.mode === 'play' && userSensor === null) $('slider').value = Math.round(st.sensor);
    $('m').textContent = build ? (angle > 45 ? 'door open' : 'door closed') : `${Math.round(angle) > 0 ? '+' : ''}${Math.round(angle)}°`;
  }

  // ---------- Step handling ----------
  const tabs = [...root.querySelectorAll('.hiw-tab')];

  function goTo(i) {
    step = (i + STEPS.length) % STEPS.length;
    t0 = performance.now();
    userSensor = null;
    $('slider').value = 50;
    const s = STEPS[step];
    root.dataset.step = s.key;
    $('num').textContent = step + 1;
    $('heading').textContent = s.title;
    $('text').textContent = s.text;
    tabs.forEach((tab, k) => {
      tab.setAttribute('aria-selected', k === step);
      tab.tabIndex = k === step ? 0 : -1;
      tab.classList.toggle('is-done', k < step);
      tab.style.setProperty('--p', 0);
    });
    if (s.key === 'setup') angle = 0;
  }

  function setAutoplay(on) {
    autoplay = on;
    root.classList.toggle('is-paused', !on);
    $('pause').setAttribute('aria-label', on ? 'Pause auto-play' : 'Resume auto-play');
  }

  function frame(now) {
    const dt = Math.min(64, now - last);
    last = now;
    if (visible) {
      const s = STEPS[step];
      let t = now - t0;
      if (t > s.dur) {
        if (autoplay) { goTo(step + 1); t = 0; }
        else if (s.key !== 'play' && s.key !== 'build') { t0 = now; t = 0; }   // replay the step
      }
      if (reduceMotion && (s.key === 'setup' || s.key === 'train')) t = s.dur;  // show the end state only

      const frozen = reduceMotion && userSensor === null && (s.key === 'play' || s.key === 'build');
      const st = scene(s.key, frozen ? 1250 : t);
      if (st.target !== undefined) angle += (st.target - angle) * Math.min(1, dt / 160);
      else angle = st.angle;
      draw(st);
      tabs[step].style.setProperty('--p', autoplay ? clamp01(t / s.dur) : 0);
    }
    requestAnimationFrame(frame);
  }

  // ---------- Controls ----------
  tabs.forEach((tab) => tab.addEventListener('click', () => { setAutoplay(false); goTo(+tab.dataset.i); }));
  root.querySelector('.hiw-tabs').addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    setAutoplay(false);
    goTo(step + (e.key === 'ArrowRight' ? 1 : -1));
    tabs[step].focus();
  });
  $('prev').addEventListener('click', () => { setAutoplay(false); goTo(step - 1); });
  $('next').addEventListener('click', () => { setAutoplay(false); goTo(step + 1); });
  $('pause').addEventListener('click', () => setAutoplay(!autoplay));
  $('slider').addEventListener('input', (e) => { setAutoplay(false); userSensor = +e.target.value; });

  // Only animate while on screen
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      const wasHidden = !visible;
      visible = entry.isIntersecting;
      if (visible && wasHidden) t0 = performance.now();
    }).observe(root);
  }

  goTo(0);
  setAutoplay(autoplay);
  requestAnimationFrame(frame);
})();
