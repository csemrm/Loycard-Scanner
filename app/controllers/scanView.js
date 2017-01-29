var args = arguments[0] || {};

//Function for changing views
var changeView = args.changeView;

/*
 * This function opens the qrcode window.
 */
function scanClicked(e) {
  var barcodeWindow = Alloy.createController('qrCodeWindow', {
    changeView: changeView
  }).getView();
  barcodeWindow.open();
}
