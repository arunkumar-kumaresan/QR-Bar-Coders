function onOpen(e) {
    DocumentApp.getUi().createAddonMenu()
        .addItem('Create QR Code', 'showSidebar')
        .addToUi();
}

function doGet() {
    return HtmlService.createHtmlOutputFromFile('index');
}

function onInstall(e) {
    onOpen(e);
}

function showSidebar() {
    var ui = HtmlService.createHtmlOutputFromFile('index')
        .setTitle('QR Bar Coders');
    DocumentApp.getUi().showSidebar(ui);
}