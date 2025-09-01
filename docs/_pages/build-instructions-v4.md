---
layout: page
title: Build Instructions
permalink: /resources/build-instructions-V4
---
<div class="build-instructions">

  <p>This guide provides step-by-step instructions for assembling the Smart Motor V4..</p>

  <h2 id="table-of-contents">Table of Contents</h2>
  <ol>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#preparing">Preparing the parts</a></li>
    <li><a href="#assembly-instructions">Assembly Instructions</a></li>
    <li><a href="#time-estimates">Time Estimates</a></li>
    <li><a href="#programming-your-smart-motor">Programming Your Smart Motor</a></li>
  </ol>

  <h2 id="introduction">Introduction</h2>
  <p>The Smart Motor V4 also uses a custom Smart Motor board with ESP32C3. The main difference between V3 and V4 is you can power the Smart Motor with AAA batteries in V4. In the following steps you will find instructions on how to order the boards from Seeed Studio. You will also find the files to 3D print and parts you will need to order to build your own Smart Motors. Send us and email if you build one at <i>milan.dahal@tufts.edu</i>.</p>

  <div class="image-row">
    <img src="/assets/build_instructions/pcb_front.png" alt="Smart Motor PCB Front View">
    <img src="/assets/build_instructions/pcb_back.png" alt="Smart Motor PCB Back View">
  </div>

  <div class="note">
    <strong>Note:</strong> PCB fabrication takes approximately one month from ordering to delivery.
  </div>


  <h2 id="preparing">Preparing the parts</h2>
  Smart Motors V4 has three printed circuit boards (PCBs) and a servo motor. The 3D printed part consists of a custom battery case that houses 4 AAA sized rechargable batteries. The case is held together with bolts and threaded nuts. Below are the instructions on where to find all the materials.

  <h3>Ordering Smart Motors PCBs.</h3>
  <p>In order to order the main PCBs from Seeed Studio:</p>
  <ol>
    <li>Go to <a href="https://www.seeedstudio.com/fusion_pcb.html" target="_blank">Seeed Studio Fusion PCB</a> (sign up/login required)</li>
    <li>Upload the gerber files: <a href="/assets/build_instructions/JulySM.zip">GerberFiles.zip</a></li>
    <li>Upload the instructions: <a href="/assets/build_instructions/Instructions.zip">Instructions.zip</a></li>
    <li>Upload the bill of materials: <a href="/assets/build_instructions/BOM.xlsx">BOM.xlsx</a></li>
  </ol>

  <p>Here are two additional PCBs that are required for V4 assembly.</p>
  <ol>
    <li>PCB that goes on the battery pack: <a href="/assets/build_instructions/BatterySidePCB.zip">BatterySidePCB.zip</a></li>
    <li>PCB that goes on the motor side: <a href="/assets/build_instructions/MotorSidePCB.zip">MotorSidePCB.zip</a></li>
      <div class="note">
      <strong>Note:</strong> Some soldering is required to complete the PCB. Find parts in the parts list section and instructions in the Assembly Instructions section.
      </div>
  </ol>




  <h3>3D printing Smart Motor parts.</h3>
  <div>
    <div>
        <p>Print the following STL files. Make sure you print the Top and Box with PLA filament as we need to put heated inserts.</p>
        <ol>
          <li><a href="/assets/build_instructions/V4/TopV4.stl">Top.stl</a></li>
          <li><a href="/assets/build_instructions/V4/BoxV4.stl">Box.stl</a></li>
          <li><a href="/assets/build_instructions/V4/MotorMountV4.stl">Motor Mount.stl</a></li>
          <li><a href="/assets/build_instructions/V4/BatterycaseV4.stl">Battery Case.stl</a></li>
          <li><a href="/assets/build_instructions/V4/BottomV4.stl">Bottom.stl</a></li>
          <li><a href="/assets/build_instructions/Servo_Horn.stl">Servo Horn.stl</a></li>
        </ol>
      </div>

      <div class="image-row-4">
        <a href="/assets/build_instructions/V4/TopV4.stl"><img src="/assets/build_instructions/V4/TopV4.png" alt="Top" title="Top" ></a>
        <a href="/assets/build_instructions/V4/BoxV4.stl"><img src="/assets/build_instructions/V4/BoxV4.png" alt="Box" title="Box"></a>
        <a href="/assets/build_instructions/V4/MotorMountV4.stl"><img src="/assets/build_instructions/V4/MotorMountV4.png" alt="Motor Mount" title="Motor_Mount"></a>
        <a href="/assets/build_instructions/V4/BatterycaseV4.stl"><img src="/assets/build_instructions/V4/Batterycase.png" alt="Battery case" title="Battery case"></a>
        <a href="/assets/build_instructions/V4/BottomV4.stl"><img src="/assets/build_instructions/V4/Bottom.png" alt="Bottom" title="Bottom"></a>
        <a href="/assets/build_instructions/Servo_Horn.stl"><img src="/assets/build_instructions/V4/ServoHornV4.png" alt="Servo Horn" title="Servo_Horn"></a>


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
        <td>PLA filament</td>
        <td>As needed</td>
        <td>-</td>
      </tr>
      <tr>
        <td>M2 screw, 6 mm</td>
        <td>2</td>
        <td><a href="https://www.mcmaster.com/92010A005/" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 screw, 4 mm</td>
        <td>6</td>
        <td><a href="https://www.mcmaster.com/92010A001" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 nut</td>
        <td>2</td>
        <td><a href="https://www.mcmaster.com/90591A265" target="_blank">McMaster Link</a></td>
      </tr>
      <tr>
        <td>M2 threaded inserts</td>
        <td>6</td>
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
      <tr>
        <td>Pogo pins</td>
        <td>4</td>
        <td><a href="https://a.co/d/deNPAXg" target="_blank">Amazon Link</a></td>
      </tr>
      <tr>
        <td>Schottky diode</td>
        <td>1</td>
        <td><a href="https://www.digikey.com/short/9r8zq47w" target="_blank">DigiKey Link</a></td>
      </tr>
      <tr>
        <td>2-pin JST connector</td>
        <td>1</td>
        <td><a href="https://www.digikey.com/short/p999vhqd" target="_blank">Digikey Link</a></td>
      </tr>
      <tr>
        <td>Battery connector (Positive terminal)</td>
        <td>1</td>
        <td><a href="https://www.digikey.com/short/pr3828fp" target="_blank">DigiKey Link</a></td>
      </tr>
      <tr>
        <td>Battery connector (Negative terminal)</td>
        <td>1</td>
        <td><a href="https://www.digikey.com/short/7c7ph8t3" target="_blank">DigiKey Link</a></td>
      </tr>
      <tr>
        <td>Battery connector (Positive-Negative terminal)</td>
        <td>3</td>
        <td><a href="https://www.digikey.com/short/hdqprt93" target="_blank">DigiKey Link</a></td>
      </tr>
      <tr>
        <td>Rechargeable battery</td>
        <td>4</td>
        <td><a href="https://a.co/d/b4fmGQC" target="_blank">Amazon Link</a></td>
      </tr>



    </tbody>
  </table>
  <div class="note">
  <strong>Note:</strong> Seeedstudio may email you saying they cannot find the OLED screens. You should ask them to try to find the part OLED with part number ZJY096I0400BG01. If they cannot find the OLED, you will need to oder the OLED screens (link above) and solder them on your own (instructions below).  
  </div>


  <h2 id="assembly-instructions">Assembly Instructions</h2>

  <div class="note">
    <strong>Note:</strong> The assembly instructions for V4 is similar to that of Smart Motor V3. The additional instructions are for creating battery pack and mounting the PCBs. 
  </div>

  <h3>Step 1: Prepare the main PCB.</h3>
  <ol>
    <li>
      <span class="step"> Solder the OLED screen</span> to the Smart Motor board. Solder them in the second row of headers as shown in the image. (Skip this step if your board already has OLED screen.)
      <div class ="image-single">
      <img src="/assets/build_instructions/oled_soldering.png" alt="OLED Screen Soldering">
      </div>
    </li>
    <li>
      <span class="step">Attach the antenna</span> to the Smart Motor board.
      <ul>
        <li>Angle the side opposite to the wire more downward to help with insertion</li>
        <li>Press firmly until it snaps into place</li>
      </ul>
      <div class ="image-single">
        <img src="/assets/build_instructions/antenna_wire.png" alt="Antenna wire">
      </div>
    </li>
    <li>
      <span class="step">Connect the servo motor</span> to the motor pins on the Smart Motor board.
      <ul>
        <li>Ensure the wires are inserted in the row labeled "BATT" (if using battery)</li>
        <li>The brown wire should be on the inside</li>
        <li>There should be one unused header on the outside</li>
        <li>You will need to bend the header pins to 90 degrees to fit inside the box (will update the design in the next iteration to avoid this step)</li>
      </ul>
      <div class ="image-single">
        <img src="/assets/build_instructions/motor_wire.png" alt="Motor connection">
      </div>
    </li>
  </ol>
  <h3>Step 2: Mounting the motor</h3>
  <ol start="4">
    <li>
      <span class="step">Secure the servo motor inside the Box.</span>
      <ul>
        <li>Place a M2 nut inside the nut pocket in the Box - you might need to push it in with some force.</li>
        <li>Secure the motor with the motor mount using a 6mm M2 bolt.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/MotorMount1.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/MotorMount3.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/MotorMount2.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/MotorMount4.png" alt="Step 4" title="Step 4"></a>
      </div>
    </li>
    <li>
    <span class="step">Attach the wheel</span> to the servo motor:
      <ul>
        <li>Push the wheel onto the motor shaft</li>
        <li>The convex side should face toward the box and the concave side away</li>
        <li>This may require some force to attach</li>
        <li>Secure it with the bolt from the servo motor packet (not the screw)</li>
      </ul>
      <div class ="image-single">
        <img src="/assets/build_instructions/V4/servohub.png" alt="Servo Horn connection">
      </div>
    </li>
  </ol>



<h3>Step 3: Build the battery case</h3>
  <ol start="6">
    <li>
      <span class="step">To build the battery case, use the Battery case V4 print, the battery connectors and Battery Side PCB</span>. 
      <ul>
        <li>Insert the battery connectors as shown in the image making sure that direction of batteries alternate.</li>
        <li>Solder the battery connector leads to Battery Side PCB on the other side.</li>
        <li>Use cutter to cut the extra leads from the PCB.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/Batterycase1.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/Batterycase2.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/Batterycase3.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/Batterycase4.png" alt="Step 4" title="Step 4"></a>
      </div> 
      <div class ="image-row-4">  
        <a><img src="/assets/build_instructions/V4/Batterycase5.png" alt="Step 5" title="Step 5"></a>
        <a><img src="/assets/build_instructions/V4/Batterycase6.png" alt="Step 6" title="Step 6"></a>
      </div>
    </li>
    <li>
      <span class="step">Insert the batteries</span> in the battery case. 
      <ul>
        <li>Take 4 rechargeable Ni-MH batteries.</li>
        <li>Insert them into the battery case as shown. Double check the polarity of the batteries.</li>
        <li>Use the Bottom part to secure the batteries in the battery case.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/Bcase1.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/Bcase2.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/Bcase3.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/Bcase4.png" alt="Step 4" title="Step 4"></a>
      </div>
    </li>
  </ol>

<h3>Step 4: Attaching the battery PCB in the Box.</h3>
  <ol start="8">
    <li>
      <span class="step">Solder the components</span> on the PCB and secure it in the Box.
      <ul>
        <li>Take 4 pogo pins, a diode, 2-Pin JST connector jumper cable, M2 nut, 6mm M2 bolt and the Box Side PCB.</li>
        <li>Solder the 4 pogo pins on the PCB. Make sure you solder on the side as shown in the image.</li>
        <li>Solder the diode on the PCB.</li>
        <li>Make sure the 2-Pin JST has red and black wires on the right side of the connector.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/BoxPCB1.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB2.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB3.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB4.png" alt="Step 4" title="Step 4"></a>
      </div>
      <ul>
        <li>Solder the wires to the PCB as shown. Double check the position of red and black wires.</li>
        <li>Insert the JST connector to the battery connector, check the positions of red and black wires again.</li>
        <li>Insert the PCB inside the box and secure with the 6mm M2 bold and M2 nut as shown.</li>
        <li>The pogo pins should poke out of the holes in the back.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/BoxPCB5.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB6.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB7.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/BoxPCB8.png" alt="Step 4" title="Step 4"></a>
      </div>
    </li>
    
  </ol>
  <h3>Step 5: Threaded inserts and final assembly.</h3>
  <ol start="9">
    <li>
      <span class="step">Use a soldering iron</span> to insert the threaded inserts into the two holes on the TOP as well as four holes on the BOX.
      <div class="image-row">
        <img src="/assets/build_instructions/V4/ThreadedInsert1.png" alt="Threaded Insert Installation - 1">
        <img src="/assets/build_instructions/V4/ThreadedInsert2.png" alt="Threaded Insert Installation - 2">
      </div>
    </li>
    <li>
      <span class="step">Arrange the electronics</span>:
      <ul>
        <li>Stuff the wire and antenna into the box</li>
        <li>Secure the Smart Motor board so it sits flush. If you feel resistance, first bend the headers connecting to the motor almost 90 degrees as shown below and check the wires.</li>
        <li>Set the sensor switch to analog by flipping the switch toward the right.</li>
        <div class="image-row">
          <img src="/assets/build_instructions/V4/Stuff1.png" alt="Stuff electronics 1">
          <img src="/assets/build_instructions/V4/Stuff2.png" alt="Stuff electronics 2">
        </div>
      </ul>
    </li>
    <li>
      <span class="step">Assemble everything</span>:
      <ul>
        <li>Take the assembled box and battery case parts.</li>
        <li>Connect the two halves together and secure with 4 4mm M2 bolts.</li>
        <li>Remove the protective film from the screen and place the Top and secure with 2 4mm M2 bolts.</li>
        <li>Attach the button cap to finish the assembly process.</li>
      </ul>
      <div class ="image-row-4">
        <a><img src="/assets/build_instructions/V4/Final1.png" alt="Step 1" title="Step 1" ></a>
        <a><img src="/assets/build_instructions/V4/Final2.png" alt="Step 2" title="Step 2"></a>
        <a><img src="/assets/build_instructions/V4/Final3.png" alt="Step 3" title="Step 3"></a>
        <a><img src="/assets/build_instructions/V4/Final4.png" alt="Step 4" title="Step 4"></a>
      </div>
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
        <td>10 minutes</td>
      </tr>
    </tbody>
  </table>

  <h2 id="programming-your-smart-motor">Programming Your Smart Motor</h2>
      Use the <a href="https://mdahal01.pyscriptapps.com/esp32c3-firmware-setup-copy/latest/" target="_blank">Smart Motor Update Portal</a> to flash micropython firmware and to upload the code on your Smart Motor.
  <hr>

  <p><small>This guide is maintained by the Smart Motors team. For questions or support, please email us. Find our contact info in our <a href="/contact/" target="self">Contact Us</a> page.</small></p>
</div>
