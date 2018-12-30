var aayleyonline_nav = {
    doNotification: function () {
        chrome.notifications.clear('notifyON' + aayleyonline_params.title, function (id) {});
        chrome.notifications.create('notifyON' + aayleyonline_params.title, {
            type: "basic",
            title: aayleyonline_params.title,
            message: aayleyonline_params.message,
            iconUrl: "iconon128.png"
        }, function (id) {});
    },
    setIconON: function (on) {
        var status = on ? "on" : "off";
        chrome.browserAction.setIcon({
            path: "icon" + status + "48.png"
        });
    },
    goIt: function () {
        if (aayleyonline.isON) {
            chrome.tabs.create({
                url: aayleyonline.getCurrentRedirectUrl()
            }, function (tab) {});
        } else {
            chrome.tabs.create({
                url: aayleyonline_params.offlineUrl
            }, function (tab) {});
        }
    }
}

chrome.browserAction.onClicked.addListener(aayleyonline_nav.goIt);
chrome.notifications.onClicked.addListener(function (notificationId) {
    if (notificationId === 'notifyON' + aayleyonline_params.title) {
        chrome.tabs.create({
            url: aayleyonline.getCurrentRedirectUrl()
        }, function (tab) {});
    }
});

aayleyonline_nav.setIconON(false);
var aayleyonline = new BtnLive(aayleyonline_params.chaines, function (result) {
    aayleyonline_nav.setIconON(result);
    if (result) {
        aayleyonline_nav.doNotification();
    }
}, 60000, 2);