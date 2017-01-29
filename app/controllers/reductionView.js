var args = arguments[0] || {};

//Function for synchronizing the transaction with server
var syncData = require('syncData');

//Function for changing views
var changeView = args.changeView;

var clientId,
  reduction,
  reductionLeft;

//This function re set the available reduction for a user
this.init = function(id, reductionAmount) {
  clientId = id;
  reduction = reductionAmount;
  $.reductionToUse.setValue('');
  $.availableReduction.setText(L('availableDiscount') + reduction.toFixed(2) + L('currency'));
};

/*
 * This function executes on click of the submit button
 */
function submit() {
  var reductionToUse = $.reductionToUse.getValue();
  if (reductionToUse != '') {
    if (reductionToUse <= reduction) {
      reductionLeft = (reduction - reductionToUse).toFixed(2);
      if (clientId) {
        if (reductionLeft) {
          syncData.updatePurchases(clientId, function(e) {
            alert(L('reductionSuccessful'));
            syncData.makePurchase(clientId, reductionLeft, function(e) {
              changeView('scan');
              clientId = null;
              reduction = null;
              reductionLeft = null;
            }, false);
          });
        } else {
          alert(L('reductionAmountError'));
        }
      } else {
        alert(L('clientIdNotAvailable'));
      }
    } else {
      alert(L('reductionAmountSufficient'));
    }
  } else {
    alert(L('reductionAmountRequired'));
  }
}
