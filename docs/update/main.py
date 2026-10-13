from pyscript import document, window, when
import asyncio, json
import repl
import time
from pyscript.js_modules import Req
import V3
import SPIKE

update_flag = False
base_url = 'https://raw.githubusercontent.com/tuftsceeo/SmartMotors/refs/heads/master/V3/'
version_url = base_url + 'swv.py'
to_upload_url = base_url + 'toupload.py'


read_code = """
f = open('%s', "rb")
result = f.read().decode('utf-8')
f.close()
result
"""

#------------------------UI helpers------------------
# Visibility and styling live in portal.css, keyed off #sm-portal[data-state]:
# idle -> connecting -> connected -> uploading -> done | error

def set_state(state):
    document.getElementById('sm-portal').dataset.state = state

def set_text(element_id, text):
    document.getElementById(element_id).textContent = text

def set_label(element_id, text):
    document.querySelector('#' + element_id + ' .btn-label').textContent = text

def set_tone(element_id, tone):
    document.getElementById(element_id).dataset.tone = tone

def set_busy(element_id, busy):
    button = document.getElementById(element_id)
    button.classList.toggle('is-busy', busy)
    button.disabled = busy

set_text('version_pyscript', "Latest v" + V3.swv)
set_state('idle')

#------------------------All Things REPL-------------

list_files   = document.getElementById('list_files')

uboard = repl.uRepl()
exp_code = """
import os
# get back to root
if (not os.getcwd() == '/flash'):
    os.chdir('/flash')
# switch to program files
os.chdir("program")
# check if slot '00'
if os.listdir().count("00"):
    os.chdir("00")
else:
    # no slot '00' so make it
    os.mkdir("00")
    os.chdir("00")
# delete any previous programs stored in slot
program_names = ['program.mpy', 'program.py']
for program in program_names:
    if (program in os.listdir()):
        os.remove(program) # if found, remove



os.chdir('/flash') # return back to root
print('done')
"""

# ------------------Buttons---------------------------
@when("click", "#connect")
async def on_connect(event):
    window.console.log("connect button pressed")
    stop = True
    if uboard.connected:
        await uboard.board.disconnect()
        await on_disconnect()
    else:
        set_state('connecting')
        set_label('connect', 'Connecting')
        set_busy('connect', True)
        await uboard.board.connect('repl',True)  # False if you want to see existing code
        for i in range(100):
            if uboard.connected: 
                break
            await asyncio.sleep(0.1)
        set_busy('connect', False)
        if uboard.connected:
            set_label('connect', 'Disconnect')
            set_state('connected')
            if stop:
                window.console.log("board name", uboard.board.name)
                await re_version(None)
        else:
            set_label('connect', 'Connect Smart Motor')
            set_state('idle')

async def on_disconnect():
    set_label('connect', 'Connect Smart Motor')
    set_label('upload', 'Update Smart Motor')
    set_text('version_board', "")
    set_text('update_message', "")
    set_text('success_message_text', "")
    set_state('idle')
    list_files.options.length = 0
    document.getElementById('title').value = ''
    uboard.buffer = ''

@when("click", "#download")
async def on_download(event):
    if uboard.connected:
        result = await uboard.eval(read_code % list_files.value,hidden = True)
        python.code = result

@when("click", "#clear")
def on_clear(event):
    if uboard.connected:
        uboard.board.terminal.clear()

@when("click", "#CtrlC")
async def send_CtrlC(event):
    if uboard.connected:
        await uboard.board.write('\x03')
        
@when("click", "#CtrlD")
async def send_CtrlD(event):
    if uboard.connected:
        await uboard.board.write('\x04')


hub = ''
@when("click", "#re_list")
async def re_list(event):
    global hub
    if uboard.connected:
        hub = await uboard.getList(list_files,'hubname')
        window.console.log(hub)
        if hub:
            result = await uboard.eval(read_code % hub,hidden = True)
            window.console.log(result)
        




hub = ''
@when("click", "#version")
async def re_version(event):
    global hub
    
    if uboard.connected:
        # Get version file from board
        if("SPIKE" in uboard.board.name): #if SPIKE is detected on port
            set_text('version_board', "LEGO SPIKE Prime")
            set_tone('update_message_div', 'warning')
            set_text('update_message', "This SPIKE hub doesn't have Smart Motor installed yet.")
            set_label('upload', "Install Smart Motor on SPIKE")
        elif("ESP32C3" in uboard.board.name):
            hub = await uboard.getList(list_files, 'swv')
            pyscript_version = V3.swv
    
            
            if hub:
                # Get board version content
                board_version = await uboard.eval(read_code % hub, hidden=True)
                clean_board = board_version.strip() if board_version else ""
                set_text('version_board', "On motor v" + clean_board if clean_board else "On motor: unknown version")
                
                if pyscript_version != clean_board:
                    set_tone('update_message_div', 'warning')
                    set_text('update_message', "Update available: v" + pyscript_version + " is ready to install.")
                    set_label('upload', "Update Smart Motor")
     
                else:
                    set_tone('update_message_div', 'success')
                    set_text('update_message', "Your Smart Motor is up to date.")
                    set_label('upload', "Reinstall anyway")
            else:
                set_text('version_board', "On motor: unknown version")
                set_tone('update_message_div', 'warning')
                set_text('update_message', "Update available: v" + pyscript_version + " is ready to install.")
                set_label('upload', "Update Smart Motor")
            

@when("click", "#removespikeprogram")
async def removespikeprogram(event):
    if uboard.connected:
        await uboard.board.paste(exp_code)
        uboard.focus()




@when("click", "#delete")
async def delete_code(event):
    result = await uboard.paste(f"""
        import os
        os.remove({json.dumps(list_files.value)})
    """)
    await uboard.getList(list_files)
    return result

@when("click", "#run")
async def on_run(event):
    if uboard.connected:
        await uboard.paste(python.code)
        uboard.focus()


  
@when("click", "#upload")
async def on_upload(event):
    error_count = 0
    window.console.log(uboard.board.name)
    window.console.log(uboard.connected)
    if uboard.connected:
        set_state('uploading')
        set_label('upload', "Updating")
        set_busy('upload', True)
        document.getElementById('connect').disabled = True
        
        window.console.log("I am in", uboard.board.name)
        if("SPIKE" in uboard.board.name): #if SPIKE is detected on port
            window.console.log("removing programs first")
            result = await removespikeprogram(None)

            for key in SPIKE.code_list:
                success = await uboard.board.upload('/flash/program/00/program.py' , SPIKE.code_list[key])           
                window.console.log(success)
                if not success:
                    error_count +=1
        
        
        
        
        elif("ESP32C3" in uboard.board.name):
            hub = await uboard.getList(list_files, 'swv')
            pyscript_version = V3.swv

            for key in V3.code_list:
                success = await uboard.board.upload(key, V3.code_list[key])           
                window.console.log(success)
                if not success:
                    error_count +=1


        
        await send_CtrlC(None)
        set_busy('upload', False)
        document.getElementById('connect').disabled = False
        if error_count >0:
            noun = 'file' if error_count == 1 else 'files'
            set_tone('success_message_div', 'danger')
            set_text('success_message_text', str(error_count) + ' ' + noun + " didn't upload. Check the USB cable and try again.")
            set_label('upload', "Try again")
            set_state('error')
        else:
            set_tone('success_message_div', 'success')
            set_text('success_message_text', "Update complete! You can unplug this motor.")
            set_label('connect', "Update another motor")
            set_state('done')
            
        uboard.focus()    
        await send_CtrlD(None)


async def handle_board(event):
    code = event.code
    if uboard.connected:
        await uboard.paste(code)
        uboard.focus()
        return False  # return False to avoid executing on browser
    else:
        return True
        
uboard.disconnect_callback = on_disconnect
#python.handleEvent = handle_board


'''
esptool.py -p /dev/tty.usbmodem2101 -b 460800 --before default_reset --after hard_reset --chip esp32c3 --no-stub write_flash --flash_mode dio --flash_size 4MB --flash_freq 80m 0x0 bootloader/bootloader.bin 0x8000 partitiontable/partition-table.bin 0x10000 micropython.bin
'''