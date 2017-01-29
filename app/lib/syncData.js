//This function gets username and email for the user
exports.getUserInfo = function(id, callback) {
  var url = Alloy.Globals.rootURL + '/getUserInfo.php';
  var xhr = Ti.Network.createHTTPClient();

  Alloy.Globals.showIndicator();

  xhr.onload = function() {
    var json = this.responseText;
    var response = JSON.parse(json);
    //Ti.API.info(JSON.stringify(response));
    if (response.success) {
      callback({
        id: response.user_id,
        username: response.username,
        email: response.email
      });
    } else {
      alert(response.message);
    }

    Alloy.Globals.hideIndicator();
  };

  xhr.onerror = function(e) {
    alert('Error occured. Please try again');
    //Ti.API.info('Error: ' + JSON.stringify(e));
    Alloy.Globals.hideIndicator();
  };
  xhr.setTimeout(10000);

  var params = {
    id: id
  };

  xhr.open('POST', url);
  xhr.send(params);
};

/*
 * This function check for purchases that a client made
 */
exports.checkPurchases = function(clientId, callback) {
  var url = Alloy.Globals.rootURL + '/checkPurchases.php';
  var xhr = Ti.Network.createHTTPClient();

  xhr.onload = function() {
    var json = this.responseText;
    var response = JSON.parse(json);
    //Ti.API.info('------ checkPurchases ' + JSON.stringify(response));
    if (response.success) {
      callback(response.result);
    } else {
      alert(response.message);
    }
  };

  xhr.onerror = function(e) {
    alert('Error occured. Please try again');
    //Ti.API.info('Error: ' + JSON.stringify(e));
  };
  xhr.setTimeout(10000);

  var params = {
    userId: clientId
  };

  xhr.open('POST', url);
  xhr.send(params);
};

//This function make a purchase for a client
exports.makePurchase = function(clientId, amountValue, callback, indicator) {
  var url = Alloy.Globals.rootURL + '/makePurchase.php';
  var xhr = Ti.Network.createHTTPClient();

  if (indicator) {
    Alloy.Globals.showIndicator();
  }

  xhr.onload = function() {
    var json = this.responseText;
    var response = JSON.parse(json);
    //Ti.API.info('----- make purchase result ' + JSON.stringify(response));
    if (response.success) {
      callback();
    } else {
      if (indicator) {
        alert(response.message);
      }
    }
    if (indicator) {
      Alloy.Globals.hideIndicator();
    }
  };

  xhr.onerror = function(e) {
    alert('Error occured. Please try again');
    //Ti.API.info('Error: ' + JSON.stringify(e));
    if (indicator) {
      Alloy.Globals.hideIndicator();
    }
  };
  xhr.setTimeout(10000);

  var params = {
    userId: clientId,
    amount: amountValue
  };

  xhr.open('POST', url);
  xhr.send(params);
};

//This function resets the purchases for a client
exports.updatePurchases = function(clientId, callback) {
  var url = Alloy.Globals.rootURL + '/updatePurchases.php';
  var xhr = Ti.Network.createHTTPClient();

  Alloy.Globals.showIndicator();

  xhr.onload = function() {
    var json = this.responseText;
    var response = JSON.parse(json);
    //Ti.API.info('make purchase result ' + JSON.stringify(response));
    if (response.success) {
      callback();
    } else {
      alert(response.message);
    }

    Alloy.Globals.hideIndicator();
  };

  xhr.onerror = function(e) {
    alert('Error occured. Please try again');
    //Ti.API.info('Error: ' + JSON.stringify(e));
    Alloy.Globals.hideIndicator();
  };
  xhr.setTimeout(10000);

  var params = {
    userId: clientId
  };

  xhr.open('POST', url);
  xhr.send(params);
};
