---
layout: page
title: Build Instructions
permalink: /resources/build-instructions/
---
<div class="build-instructions">

  <p>This guide provides step-by-step instructions for assembling the Smart Motor V3 with 3D printed parts.</p>

  <h2 id="table-of-contents">Table of Contents</h2>
  <ol>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#parts-and-materials">Parts and Materials</a></li>
    <li><a href="#3d-printing-requirements">3D Printing Requirements</a></li>
    <li><a href="#assembly-instructions">Assembly Instructions</a></li>
    <li><a href="#time-estimates">Time Estimates</a></li>
    <li><a href="#programming-your-smart-motor">Programming Your Smart Motor</a></li>
  </ol>

  <h2 id="introduction">Introduction</h2>
  <p>The Smart Motor V3 uses a custom Smart Motor board with ESP32C3. In the following steps you will find instructions on how to order the boards from Seeed Studio. You will also find the files to 3D print and parts you will need to order to build your own Smart Motors. Send us and email if you build one at <i>milan.dahal@tufts.edu</i>.</p>

  <div class="image-row">
    <img src="/assets/build_instructions/pcb_front.png" alt="Smart Motor PCB Front View">
    <img src="/assets/build_instructions/pcb_back.png" alt="Smart Motor PCB Back View">
  </div>

  <div class="note">
    <strong>Note:</strong> PCB fabrication takes approximately one month from ordering to delivery.
  </div>

  <h3>Ordering Smart Motors PCBs.</h3>
  <p>In order to order the PCBs from Seeed Studio:</p>
  <ol>
    <li>Go to <a href="https://www.seeedstudio.com/fusion_pcb.html" target="_blank">Seeed Studio Fusion PCB</a> (sign up/login required)</li>
    <li>Upload the gerber files: <a href="/assets/build_instructions/JulySM.zip">GerberFiles.zip</a></li>
    <li>Upload the instructions: <a href="/assets/build_instructions/Instructions.zip">Instructions.zip</a></li>
    <li>Upload the bill of materials: <a href="/assets/build_instructions/BOM.xlsx">BOM.xlsx</a></li>
  </ol>

  <h3>3D printing Smart Motor parts.</h3>
  <div>
    <div>
        <p>Print the following STL files with PLA filament:</p>
        <ol>
          <li><a href="/assets/build_instructions/Top.stl">Top.stl</a></li>
          <li><a href="/assets/build_instructions/Box.stl">Box.stl</a></li>
          <li><a href="/assets/build_instructions/Motor_Mount.stl">Motor Mount.stl</a></li>
          <li><a href="/assets/build_instructions/Servo_Horn.stl">Servo Horn.stl</a></li>
        </ol>
      </div>

      <div class="image-row-4">
        <figure>
          <img src="/assets/build_instructions/Top.png" alt="Top" href="/assets/build_instructions/Top.stl">
          <figcaption>Top</figcaption>
        </figure>
        <figure>
        <img src="/assets/build_instructions/Box.png" alt="Box" href="/assets/build_instructions/Box.stl">

        <figcaption>Box</figcaption>
      </figure>
      <figure>
        <img src="/assets/build_instructions/Motor_Mount.png" alt="Motor Mount" href="/assets/build_instructions/Motor_Mount.stl">

        <figcaption>Motor Mount</figcaption>
      </figure>
      <figure>
        <img src="/assets/build_instructions/Servo_Horn.png" alt="Servo Horn" href="/assets/build_instructions/Servo_Horn.stl">

        <figcaption>Servo Horn</figcaption>
      </figure>

      </div>

    </div>

  <h3 id="parts-and-materials">Ordering parts and materials.</h3>
Order the following components to complete the assembly.
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Quantity</th>
        <th>Link</th>
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>Servo motor</td>
        <td>1</td>
        <td><a href="https://a.co/d/8nBYK2B" target="_blank">Amazon Link</a></td>
      </tr>
      <tr>
        <td>LiPo Battery</td>
        <td>1</td>
        <td><a href="https://www.adafruit.com/product/4236" target="_blank">Adafruit Link</a></td>
      </tr>
      <tr>
        <td>PLA filament</td>
        <td>As needed</td>
        <td>-</td>
      </tr>
      <tr>
        <td>M2 screw, 10 mm</td>
        <td>1</td>
        <td><a href="https://www.mcmaster.com/92010A005/" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 screw, 4 mm</td>
        <td>2</td>
        <td><a href="https://www.mcmaster.com/92010A001" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 nut</td>
        <td>1</td>
        <td><a href="https://www.mcmaster.com/90591A265" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 threaded inserts</td>
        <td>2</td>
        <td><a href="https://a.co/d/4MNvGve" target="_blank">Amazon Link</a></td>
      </tr>
      <tr>
        <td>Button cap</td>
        <td>1</td>
        <td><a href="https://a.co/d/ayIdlaj" target="_blank">Amazon Link</a></td>
      </tr>
      <tr>
        <td>Grove light sensor</td>
        <td>1</td>
        <td><a href="https://www.seeedstudio.com/Grove-Light-Sensor-v1-2-LS06-S-phototransistor.html" target="_blank">Seeed Studio Link</a></td>
      </tr>
      <tr>
        <td>I²C OLED display (if Seeedstudio cannot find the display)</td>
        <td>1</td>
        <td><a href="https://www.amazon.com/dp/B08VNRH5HR" target="_blank">Amazon Link</a></td>
      </tr>
    </tbody>
  </table>
  <div class="note">
  <strong>Note:</strong> Seeedstudio may email you saying they cannot find the OLED screens. You should ask them to try to find the part OLED with part number ZJY096I0400BG01. If they cannot find the OLED, you will need to oder the OLED screens (link above) and solder them on your own (instructions below).  
  </div>


  <h2 id="3d-printing-requirements">3D Printing Requirements</h2>


  <h2 id="assembly-instructions">Assembly Instructions</h2>

  <div class="note">
    <strong>Note:</strong> You can follow along with the <a href="https://www.youtube.com/watch?v=ogWbSUROjmE&t=31s" target="_blank">video tutorial</a> for visual assembly guidance. The instructions below are for assembly without a battery. If you're using a battery, connect it to the battery port and connect the motor to the BATT section.
  </div>

  <img src="/assets/build_instructions/all_parts.png" alt="All Required Parts">

  <h3>Step 1: Prepare the Electronics</h3>
  <ol>
    <li>
      <span class="step">Solder the OLED screen</span> to the Smart Motor board.
      <img src="/assets/build_instructions/oled_soldering.png" alt="OLED Screen Soldering">
    </li>
    <li>
      <span class="step">Attach the antenna</span> to the Smart Motor board.
      <ul>
        <li>Angle the side opposite to the wire more downward to help with insertion</li>
        <li>Press firmly until it snaps into place</li>
      </ul>
    </li>
    <li>
      <span class="step">Connect the servo motor</span> to the motor pins on the Smart Motor board.
      <ul>
        <li>Ensure the wires are inserted in the row labeled "BATT" (if using battery)</li>
        <li>The brown wire should be on the inside</li>
        <li>There should be one unused row on the outside</li>
      </ul>
    </li>
    <li>
      <span class="step">Attach the LiPo battery</span> to the battery port on the Smart Motor board.
      <ul>
        <li>Make sure the wires are correctly oriented for proper connection</li>
      </ul>
    </li>
  </ol>

  <h3>Step 2: Prepare the 3D Printed Parts</h3>
  <ol start="5">
    <li>
      <span class="step">(Optional) Insert the nut in the nut pocket</span> (may not be required if your 3D prints have good tolerance):
      <ul>
        <li>Place a 20mm bolt inside the bottom of the box</li>
        <li>Place the M2 nut and finger-tighten as much as possible</li>
        <li>Use a screwdriver to fully tighten the bolt until the nut is secure</li>
        <li>Remove the bolt when the nut is in place</li>
      </ul>
    </li>
    <li>
      <span class="step">Insert the motor</span> into the box.
    </li>
    <li>
      <span class="step">Position the motor mount</span> into the box and attach it with the 12mm bolt.
    </li>
    <li>
      <span class="step">Attach the wheel</span> to the servo motor:
      <ul>
        <li>Push the wheel onto the outside arm of the motor</li>
        <li>The convex side should face toward the box and the concave side away</li>
        <li>This may require some force to attach</li>
        <li>Secure it with the bolt from the servo motor packet (not the screw)</li>
      </ul>
    </li>
  </ol>

  <h3>Step 3: Final Assembly</h3>
  <ol start="9">
    <li>
      <span class="step">Insert the battery</span> into the box.
    </li>
    <li>
      <span class="step">Arrange the electronics</span>:
      <ul>
        <li>Stuff the wire and antenna into the box</li>
        <li>Secure the Smart Motor board so it sits flush</li>
      </ul>
    </li>
    <li>
      <span class="step">Set the sensor switch</span> to analog by flipping the switch toward the right.
      <img src="/assets/build_instructions/sensor_switch.png" alt="Sensor Switch Location">
    </li>
    <li>
      <span class="step">Install the threaded inserts</span>:
      <ul>
        <li>Use a soldering iron to insert the threaded inserts into the two holes on the TOP 3D printed part</li>
      </ul>
      <div class="image-row">
        <img src="/assets/build_instructions/threaded_insert1.png" alt="Threaded Insert Installation - 1">
        <img src="/assets/build_instructions/threaded_insert2.png" alt="Threaded Insert Installation - 2">
      </div>
    </li>
    <li>
      <span class="step">Attach the top cover</span>:
      <ul>
        <li>Remove the protective film from the screen</li>
        <li>Place the TOP cover on the system</li>
        <li>Use the two 4mm screws to secure it in place</li>
      </ul>
    </li>
    <li>
      <span class="step">Install the button cover</span> by pressing it into place.
    </li>
  </ol>

  <h2 id="time-estimates">Time Estimates</h2>
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Estimated Time</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>3D printing</td>
        <td>6 hours</td>
      </tr>
      <tr>
        <td>Manual assembly</td>
        <td>3 minutes</td>
      </tr>
    </tbody>
  </table>

  <h2 id="programming-your-smart-motor">Programming Your Smart Motor</h2>
  <ol>
    <li>
      <span class="step">Install MicroPython</span> on your ESP32C3 board by following the <a href="https://wiki.seeedstudio.com/XIAO_ESP32C3_MicroPython/" target="_blank">official instructions</a>.
    </li>
    <li>
      <span class="step">Upload the code</span> to the ESP32C3 using a USB-C cable:
      <ul>
        <li>Use the <a href="https://mdahal01.pyscriptapps.com/smart-motor-update-portal/latest/" target="_blank">Smart Motor Update Portal</a> to upload the code</li>
        <li>Alternatively, get the source code from our <a href="https://github.com/tuftsceeo/SmartMotors" target="_blank">GitHub repository</a></li>
      </ul>
    </li>
  </ol>

  <hr>

  <p><small>This guide is maintained by the Smart Motors team. For questions or support, please visit our <a href="https://github.com/tuftsceeo/SmartMotors" target="_blank">GitHub repository</a>.</small></p>
</div>
