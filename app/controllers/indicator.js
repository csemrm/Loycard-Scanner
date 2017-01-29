$.container.showIndicator = function(parentView, parent) {
    var e;
    try {
        if (Alloy.Globals.mainViewContainer) {
            Alloy.Globals.mainViewContainer.add($.container);
        }
        $.activityInd.show();
        Ti.API.info("Indicator opened");
    } catch (_error) {
        e = _error;
        Ti.API.info("Exception IN opening indicator " + e.toString());
    }
};

$.container.hideIndicator = function(parentView, parent) {
    var e;
    try {
        if (Alloy.Globals.mainViewContainer) {
            Alloy.Globals.mainViewContainer.remove($.container);
        }
        //$.activityInd.hide();
        Ti.API.info("Indicator closed");
    } catch (_error) {
        e = _error;
        Ti.API.info("Exception IN hiding indicator " + e.toString());
    }
};
