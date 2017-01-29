//Define the theme to use
Alloy.CFG.theme = require(Alloy.CFG.theme + ".theme");

//Define root URL
Alloy.Globals.rootURL = Alloy.CFG.rootURL;

//totalPurchasesForDiscount need to be increase for one because of the reduction that is
//left from the previous purchases
Alloy.CFG.totalPurchasesForDiscount = Alloy.CFG.totalPurchasesForDiscount + 1;

//Activity Indicator.
var indWin = Alloy.createController('indicator').getView();

//Function to show the loading indicator on screen
Alloy.Globals.showIndicator = function(parentView, parent) {
    try {
        indWin.showIndicator(parentView, parent);
    } catch(e) {
        Ti.API.info("Exception in opening indicator " + e.toString());
    }
};

//Function to hide the loading indicator
Alloy.Globals.hideIndicator = function(parentView, parent) {
    try {
        indWin.hideIndicator(parentView, parent);
    } catch(e) {
        Ti.API.info("Exception in hiding indicator " + e.toString());
    }
};
