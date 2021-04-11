import QRCode from './qrcode';

function validateInputs() {
    var text = document.getElementById("qrcodetext").value;
    var width = document.getElementById("qrcode-width").value || 150;
    var height = document.getElementById("qrcode-height").value || 150;
    var fgColor = document.getElementById("qrcode-fg-color").value || "#000000";
    var bgColor = document.getElementById("qrcode-bg-color").value || "#ffffff";
    var correctionLevel = document.getElementById("qrcode-error-level").value || "3";
    var errors = "";

    if (text === "") {
        errors += "Text is empty!\n";
    } else if (typeof(text) !== "string") {
        errors += "Text is not a valid string!\n";
    } else if (text.length > 1660) {
        errors += "Text length: "+ text.length +" is greater than allowed max length 1660!\n";
    }

    if (typeof(parseInt(width)) !== "number") {
        errors += "Width is not a valid number!\n";
    } else if (width < 50) {
        errors += "Width less than 50!\n";
    } else if (width > 500) {
        errors += "Width is greater than 500!\n";
    }

    if (typeof(parseInt(height)) !== "number") {
        errors += "Height is not a valid number!\n";
    } else if (height < 50) {
        errors += "Height less than 50!\n";
    } else if (height > 500) {
        errors += "Height is greater than 500!\n";
    }

    if (typeof(fgColor) !== "string") {
        errors += "Foreground Color is not a valid string!\n";
    } else if (fgColor.length > 7) {
        errors += "Foreground Color is not a valid Hex Color!\n";
    }

    if (typeof(bgColor) !== "string") {
        errors += "Background Color is not a valid string!\n";
    } else if (bgColor.length > 7) {
        errors += "Background Color is not a valid Hex Color!\n";
    }

    if (![0,1,2,3,"0","1","2","3"].includes(correctionLevel)) {
        correctionLevel = "3";
    }

    return {
        errors: errors,
        values: {
            text: text,
            width: width,
            height: height,
            colorDark : fgColor,
            colorLight : bgColor,
            correctLevel : parseInt(correctionLevel)
        }
    }

}
function generateQRCode() {
    //generate button is disabled until qrcode is created
    var createBtnEl = document.getElementById("generate-btn");
    createBtnEl.classList.add("pure-button-disabled");

    var previewEl = document.getElementById("qrcode-preview");
    previewEl.innerHTML = "";

    var copyBtnEl = document.getElementById("copy-btn");
    var validation = validateInputs();
    var errorDiv = document.getElementById("error-div");
    errorDiv.innerText = validation.errors;

    if (validation.errors === "") {
        errorDiv.classList.remove("error-div-active");
        var values = validation.values;
        try {
            var qrcode = new QRCode(previewEl, values);
            qrcode.clear();
            qrcode.makeCode(values.text);

            previewEl.style.width = values.width + "px";
            previewEl.style.height = values.height + "px";
            copyBtnEl.classList.remove("pure-button-disabled");
            document.getElementById("copy-btn").innerText = "Copy";
        } catch (e) {
            console.log(e);
            errorDiv.innerText += "Can't able to generate QR Code! Please try again by reducing text length";
            if (values.correctLevel != 1) {
                errorDiv.innerText += " / switching to lower error correction level!";
            }
            errorDiv.classList.add("error-div-active");
            copyBtnEl.classList.add("pure-button-disabled");
        }
    } else {
        errorDiv.classList.add("error-div-active");
        copyBtnEl.classList.add("pure-button-disabled");
    }
    createBtnEl.classList.remove("pure-button-disabled");
}
function copyToClipboard() {
    var doc = document;
    var text = doc.getElementById("qrcode-preview");
    var range, selection;

    if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    document.getElementById("copy-btn").innerText = "Copied";
}

function bindEvents() {
    var generateBtn = document.getElementById("generate-btn");
    generateBtn.addEventListener('click', generateQRCode);
    var copyBtn = document.getElementById("copy-btn");
    copyBtn.addEventListener('click', copyToClipboard);
}
bindEvents();