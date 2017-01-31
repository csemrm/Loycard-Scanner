//Set the index window as global variable for the loading indicator
Alloy.Globals.mainViewContainer = $.index;

/*
 * The scan view controller that is added to the window
 * as main controller
 */
var scan = Alloy.createController('scanView', {
    changeView : changeView
});

/*
 * The amount view controller that is added to the window
 * after successful scan
 */
var amount = Alloy.createController('amountView', {
    backButton : $.backButton,
    username : $.username,
    changeView : changeView
});

/*
 * The reduction view controller that is added to the window
 * after successful scan
 */
var reduction = Alloy.createController('reductionView', {
    changeView : changeView
});

//Adding the controllers to the main view controller
$.mainViewContainer.add(scan.getView());
$.mainViewContainer.add(amount.getView());
$.mainViewContainer.add(reduction.getView());

//Back button event listener
$.backButton.addEventListener('click', function() {
    $.backButton.setVisible(false);
    $.username.setVisible(false);
    changeView('scan');
});
$.username.setVisible(true);
$.username.setText(L('scan'));
$.index.open();

/**
 *
 * This function is executed when a view need to be changed.
 * All the views are removed first and then new view is added to the window.
 * When executing, view property need to be sent in one of the following values:
 * "scan", "amount", "reduction"
 *
 * @param {String} view
 * Example:
 * view: "amount"
 *
 * @param {Object} args This holds additional parameters that can be sent.
 * Example:
 * args: {
 *      clientId : 15,
 *      reductionSum : 33
 * }
 *
 */
function changeView(view, args) {
    _.each($.mainViewContainer.getChildren(), function(e) {
        //Ti.API.info('objects added to main view: ' + e);
        e.setVisible(false);
    });
    switch (view) {
    case 'scan':
        $.backButton.setVisible(false);
        $.username.setVisible(true);
        $.username.setText(L('scan'));
        scan.getView().setVisible(true);
        break;
    case 'amount':
        amount.init(args.clientId);
        amount.getView().setVisible(true);
        $.username.setVisible(true);
        break;
    case 'reduction':
        $.username.setVisible(false);
        reduction.init(args.clientId, args.reductionSum);
        reduction.getView().setVisible(true);
        break;
    default:
        $.username.setVisible(true);
        $.username.setText(L('scan'));
        scan.getView().setVisible(true);
    }
};
//Hides the action bar on android
if (OS_ANDROID) {
    $.index.addEventListener('open', function() {
        $.index.activity.actionBar.hide();
    });
}
