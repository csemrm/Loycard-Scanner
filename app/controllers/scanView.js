var args = arguments[0] || {};

//Function for changing views
var changeView = args.changeView;

/*
 * This function opens the qrcode window.
 */
function scanClicked(e) {
    var barcodeWindow = Alloy.createController('qrCodeWindow', {
        changeView : changeView
    }).getView();

    if (Ti.Media.hasCameraPermissions()) {
        barcodeWindow.open();
    } else {
        Ti.Media.requestCameraPermissions(function(e) {
            if (e.success) {
                barcodeWindow.open();
            } else {
                alert('ou were denied permission for now, forever or the dialog did not show at all because it was denied forever before.');
            }
        });
    }
}
