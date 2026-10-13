import { ESPLoader, Transport } from "https://unpkg.com/esptool-js@0.5.4/bundle.js";

const baudRates = [460800];
const maxLogLength = 100;

// Predefined firmware files with their addresses
const PREDEFINED_FIRMWARE = [
    { filename: 'firmware.bin', address: 0x00000, url: './firmware/firmware.bin' }
];

const log = document.getElementById("log");
const butConnect = document.getElementById("butConnect");
const baudRate = document.getElementById("baudRate");
const butClear = document.getElementById("butClear");
const butErase = document.getElementById("butErase");
const butProgram = document.getElementById("butProgram");
const autoscroll = document.getElementById("autoscroll");
const appDiv = document.getElementById("app");
const progressBar = document.getElementById("progressBar");

let device = null;
let transport = null;
let esploader = null;
let chip = null;
const serialLib = !navigator.serial && navigator.usb ? serial : navigator.serial;

document.addEventListener("DOMContentLoaded", () => {
    butConnect.addEventListener("click", () => {
        clickConnect().catch(async (e) => {
            errorMsg(e.message || e);
            toggleUIConnected(false);
        });
    });
    
    butClear.addEventListener("click", clickClear);
    butErase.addEventListener("click", clickErase);
    butProgram.addEventListener("click", clickProgram);
    autoscroll.addEventListener("click", clickAutoscroll);

    window.addEventListener("error", function (event) {
        console.log("Got an uncaught error: ", event.error);
    });
    
    if ("serial" in navigator) {
        const notSupported = document.getElementById("notSupported");
        notSupported.classList.add("hidden");
    }

    loadAllSettings();
    writeLogLine("ESP Web Flasher loaded.");
    writeLogLine("Firmware files ready: " + PREDEFINED_FIRMWARE.map(f => f.filename).join(", "));
    
    // Initially hide the log container
    log.classList.remove("show");
});

function initBaudRate() {
    for (let rate of baudRates) {
        var option = document.createElement("option");
        option.text = rate + " Baud";
        option.value = rate;
    }
}

function pruneLog() {
    if (log.textContent.split("\n").length > maxLogLength + 1) {
        let logLines = log.innerHTML.replace(/(\n)/gm, "").split("<br>");
        log.innerHTML = logLines.splice(-maxLogLength).join("<br>\n");
    }

    if (autoscroll.checked) {
        log.scrollTop = log.scrollHeight;
    }
}

function writeLog(text) {
    log.innerHTML += text;
    pruneLog();
}

function writeLogLine(text) {
    writeLog(text + "<br>");
}

const espLoaderTerminal = {
    clean() {
        log.innerHTML = "";
    },
    writeLine(data) {
        writeLogLine(data);
    },
    write(data) {
        writeLog(data);
    },
};

function errorMsg(text) {
    writeLogLine('<span class="error-message">❌ Error:</span> ' + text);
    console.error(text);
}

function updateTheme() {
    // Theme functionality removed - using default styling
}

function enableStyleSheet(node, enabled) {
    // Style sheet switching removed
}

async function clickConnect() {
    if (transport !== null) {
        await transport.disconnect();
        await transport.waitForUnlock(1500);
        toggleUIConnected(false);
        transport = null;
        if (device !== null) {
            await device.close();
            device = null;
        }
        chip = null;
        return;
    }

    if (device === null) {
        try {
            device = await serialLib.requestPort({});
        } catch (e) {
            errorMsg("Connection cancelled by user");
            return;
        }
    }

    if (transport === null) {
        transport = new Transport(device, true);
    }

    try {
        const romBaudrate = parseInt(baudRate.value);
        const loaderOptions = {
            transport: transport,
            baudrate: romBaudrate,
            terminal: espLoaderTerminal,
            debugLogging: false,
        };

        esploader = new ESPLoader(loaderOptions);

        chip = await esploader.main("default_reset");
        
        writeLogLine(`🔗 Connected to ${chip}`);
        toggleUIConnected(true);
        toggleUIToolbar(true);

    } catch (e) {
        console.error(e);
        errorMsg(e.message);
    }
    console.log("Settings done for: " + chip);
}

async function clickAutoscroll() {
    saveSetting("autoscroll", autoscroll.checked);
}

async function clickErase() {
    if (window.confirm("This will erase the entire flash. Click OK to continue.")) {
        baudRate.disabled = true;
        butErase.disabled = true;
        butProgram.disabled = true;
        try {
            writeLogLine("Erasing flash memory. Please wait...");
            let stamp = Date.now();
            await esploader.eraseFlash();
            writeLogLine("✅ Finished. Took " + (Date.now() - stamp) + "ms to erase.");
        } catch (e) {
            errorMsg(e);
        } finally {
            butErase.disabled = false;
            baudRate.disabled = false;
            butProgram.disabled = false;
        }
    }
}

async function fetchFirmwareFile(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    } catch (error) {
        throw new Error(`Error loading firmware file ${url}: ${error.message}`);
    }
}

function uint8ArrayToBinaryString(uint8Array) {
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return binaryString;
}

async function clickProgram() {
    setSettings();
    
    baudRate.disabled = true;
    butErase.disabled = true;
    butProgram.disabled = true;
    progressBar.classList.remove("hidden");

    const fileArray = [];
    
    try {
        writeLogLine("📁 Loading predefined firmware files...");
        
        for (let i = 0; i < PREDEFINED_FIRMWARE.length; i++) {
            const firmwareInfo = PREDEFINED_FIRMWARE[i];
            writeLogLine(`📄 Loading ${firmwareInfo.filename} for address 0x${firmwareInfo.address.toString(16)}...`);
            
            try {
                const uint8Data = await fetchFirmwareFile(firmwareInfo.url);
                const binaryString = uint8ArrayToBinaryString(uint8Data);
                
                fileArray.push({ 
                    data: binaryString, 
                    address: firmwareInfo.address 
                });
                
                writeLogLine(`✓ ${firmwareInfo.filename} loaded successfully (${uint8Data.length} bytes)`);
            } catch (error) {
                throw new Error(`Failed to load ${firmwareInfo.filename}: ${error.message}`);
            }
        }

        writeLogLine("🔄 All firmware files loaded. Starting flash process...");

        const flashOptions = {
            fileArray: fileArray,
            flashSize: "keep",
            eraseAll: false,
            compress: true,
            reportProgress: (fileIndex, written, total) => {
                const percentage = Math.floor((written / total) * 100);
                progressBar.querySelector("div").style.width = percentage + "%";
                const currentFile = PREDEFINED_FIRMWARE[fileIndex]?.filename || `File ${fileIndex}`;
                writeLog(`\rFlashing ${currentFile}: ${percentage}%`);
            },
            calculateMD5Hash: (image) => CryptoJS.MD5(CryptoJS.enc.Latin1.parse(image)),
        };
        
        await esploader.writeFlash(flashOptions);
        writeLogLine("\n✓ Firmware flashing completed successfully!");
        
    } catch (e) {
        console.error(e);
        errorMsg(e.message);
    } finally {
        progressBar.classList.add("hidden");
        progressBar.querySelector("div").style.width = "0";
        butErase.disabled = false;
        baudRate.disabled = false;
        butProgram.disabled = false;
    }

            writeLogLine("🔄 To run the new firmware, please reset your device.");
}

async function setSettings() {
    saveSetting("baudrate", 460800);
    saveSetting("autoscroll", true);
}

async function clickClear() {
    log.innerHTML = "";
}

function toggleUIToolbar(show) {
    progressBar.classList.add("hidden");
    progressBar.querySelector("div").style.width = "0";
    
    if (show) {
        appDiv.classList.add("connected");
        // Show the ESP controls and log container
        document.querySelector('.esp-controls').classList.add('show');
        log.classList.add('show');
    } else {
        appDiv.classList.remove("connected");
        // Hide the ESP controls and log container
        document.querySelector('.esp-controls').classList.remove('show');
        log.classList.remove('show');
    }
    butErase.disabled = !show;
    butProgram.disabled = !show;
}

function toggleUIConnected(connected) {
    let lbl = "Connect for firmware";
    if (connected) {
        lbl = "Disconnect";
    } else {
        toggleUIToolbar(false);
    }
    butConnect.querySelector(".btn-label").textContent = lbl;
}

function loadAllSettings() {
    autoscroll.checked = loadSetting("autoscroll", true);
    baudRate.value = loadSetting("baudrate", 460800);
}

function loadSetting(setting, defaultValue) {
    let value = JSON.parse(window.localStorage.getItem(setting));
    if (value == null) {
        return defaultValue;
    }
    return value;
}

function saveSetting(setting, value) {
    window.localStorage.setItem(setting, JSON.stringify(value));
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}