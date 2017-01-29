var args = arguments[0] || {};

//Function for changing views
var changeView = args.changeView;

//Module for scanning qrcodes
var barcode = require('com.mfogg.barcode');

//Available codes for scanning
var upcs = [
  // "EAN2",
  // "EAN5",
  // "EAN8",
  "UPCE",
  // "ISBN10",
  "UPCA",
  "EAN13",
  // "ISBN13",
  // "COMPOSITE",
  // "I25",
  // "DATABAR",
  // "DATABAR_EXP",
  // "CODE39",
  // "PDF417",
  // "CODE93",
  // "CODE128"
];

var cameraView = barcode.createView({
  top: 0,
  height: Ti.UI.FILL,
  width: Ti.UI.FILL,
  backgroundColor: Alloy.CFG.theme.colors.backgroundColor,
  barcodes: upcs
});
cameraView.addEventListener("success", successCallback);
$.container.add(cameraView);

/*
 * This function activates the qrcode scanning feature.
 * If the qrcode is valid, the additional added string
 * 'discount' is removed and we get the client_id
 */
function successCallback(e) {
  $.container.close();

  changeView('amount', {
    clientId: e.data
  });

  Ti.API.info("Scanned " + e.data);
  //alert("Scanned " + e.data);
}
