var args = arguments[0] || {};

//Function for changing views
var changeView = args.changeView;

if (OS_IOS) {
    //Module for scanning qrcodes
    var barcode = require('com.mfogg.barcode');

    //Available codes for scanning
    var upcs = [];

    var cameraView = barcode.createView({
        top : 0,
        height : Ti.UI.FILL,
        width : Ti.UI.FILL,
        backgroundColor : Alloy.CFG.theme.colors.backgroundColor,
        barcodes : upcs
    });
    cameraView.addEventListener("success", successCallback);
    $.container.add(cameraView);
} else {
    var qrreader = require('com.acktie.mobile.android.qr');
    scanQRFromCamera({
        width : Ti.UI.FILL,
        height : Ti.UI.FILL,
        success : successCallback
    });

    function scanQRFromCamera(options) {
        var qrCodeView = qrreader.createQRCodeView(options);
        $.container.add(qrCodeView);
        

    }

}

function successCallback(e) {
    if (e != undefined && e.data != undefined) {
        $.container.close();

        changeView('amount', {
            clientId : e.data
        });

        Ti.API.info("Scanned " + e.data); 
    }
}

//Hides the action bar on android
if (OS_ANDROID) {
    $.container.addEventListener('open', function() {
        $.container.activity.actionBar.hide();
    });
}