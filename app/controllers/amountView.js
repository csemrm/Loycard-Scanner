var args = arguments[0] || {};

//Function for synchronizing the transaction with server
var syncData = require('syncData');

//Function for changing views
var changeView = args.changeView;

//Back button
var backButton = args.backButton;

//User name
var username = args.username;

var clientId;

/*
 * This function executes on click of the submit button
 */
function submit() {
  var amount = $.amount.getValue();
  var percentage = $.percentage.getValue();
  if (amount != '' && percentage != '') {
    var totalReductionAmount = (percentage / 100) * amount;
    totalReductionAmount = totalReductionAmount.toFixed(2);
    if (clientId) {
      syncData.makePurchase(clientId, totalReductionAmount, function(e) {
        alert(L('purchaseSuccessful'));
        changeView('scan');
        clientId = null;
      }, true);
    } else {
      alert(L('clientIdNotAvailable'));
    }
  } else {
    alert(L('amountPercentIsRequired'));
  }
}

//This function executes before opening amount view controller and refresh the values
this.init = function(id) {
  backButton.setVisible(true);
  $.calculatedPercentage.setVisible(false);
  setClientId(id);
  getClientInfo(id);
};

//Amount text field change event
$.amount.addEventListener('change', function() {
  calculatePercentage();
});

//Percentage text field change event
$.percentage.addEventListener('change', function() {
  calculatePercentage();
});

/*
 * This function sets the client id of the user for sync
 * data on server
 */
function setClientId(id) {
  clientId = id;
}

//This function gets the info for the client
function getClientInfo(id) {
  $.amount.setValue('');
  username.setText('');
  syncData.getUserInfo(id, setUserInfo);
};

//This function set the user name
function setUserInfo(clientInfo) {
  //Ti.API.info('user info ' + JSON.stringify(clientInfo));
  if (clientInfo.username) {
    username.setText('user: ' + clientInfo.username);
  } else if (clientInfo.email) {
    username.setText('user: ' + clientInfo.email);
  } else {
    username.setText('');
  }
  syncData.checkPurchases(clientInfo.id, handlePurchases);
}

//This function will check for status of the purchases for a client
//and execute action accordingly
function handlePurchases(result) {
  var reductionSum = result ? result.totalReductionAmount : 0;
  var numberOfPurchases = result ? result.numberOfPurchases : 0;

  if (numberOfPurchases >= Alloy.CFG.totalPurchasesForDiscount) {
    changeView('reduction', {
      clientId: clientId,
      reductionSum: reductionSum,
      purchases: result
    });
  }
}

//This function will calculate the percentage of the inputed amount
function calculatePercentage() {
  var amount = $.amount.getValue();
  var percentage = $.percentage.getValue();
  if (amount != '' && percentage != '') {
    var totalReductionAmount = (percentage / 100) * amount;
    $.calculatedPercentage.setText(L('calculatedPercentage') + totalReductionAmount.toFixed(2));
    $.calculatedPercentage.setVisible(true);
  } else {
    $.calculatedPercentage.setVisible(false);
  }
}
