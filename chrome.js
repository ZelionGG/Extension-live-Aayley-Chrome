var aayley_nav = {
    doNotification: function() {
        chrome.notifications.clear('notifyON' + aayley_params.title, function(id) { });
        chrome.notifications.create('notifyON' + aayley_params.title, { type: "basic", title: aayley_params.title, message: aayley_params.message, iconUrl: "iconon128.png" }, function(id) { });
    },
    setIconON: function(on) {
        var status = on ? "on" : "off";
        chrome.browserAction.setIcon({path : "icon" + status + "48.png"});
    },
    goIt: function() {
        if(aayley.isON){
            chrome.tabs.create({url:aayley.getCurrentRedirectUrl()},function(tab){});
        } else {
            chrome.tabs.create({url:aayley_params.offlineUrl},function(tab){});
        }
    }
}

chrome.browserAction.onClicked.addListener(aayley_nav.goIt);
chrome.notifications.onClicked.addListener(function(notificationId){
    if (notificationId === 'notifyON' + aayley_params.title) {
        chrome.tabs.create({url:aayley.getCurrentRedirectUrl()},function(tab){});
    }
});

aayley_nav.setIconON(false);
var aayley = new BtnLive(aayley_params.chaines, function(result) {
    aayley_nav.setIconON(result);
    if (result) {
        aayley_nav.doNotification();
    }
}, 60000, 2);
