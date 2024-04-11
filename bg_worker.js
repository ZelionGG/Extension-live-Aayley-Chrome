const clientId = '7sjt9diwcoz210sdkc9xkokrm8h2ol';
let streamerName = 'aayley';
let url = 'https://www.twitch.tv/' + streamerName;

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(getLiveStatus);

async function getLiveStatus() {
    const isLiveTwitch = await getTwitchStatus();

    if (!isLiveTwitch)
        return false;

    return true;
}

async function getTwitchStatus() {
    try {
        var raw = JSON.stringify({
            "channels": [
                streamerName
            ]
        });

        const response = await fetch('https://twitch.theorycraft.gg/channel-status', {
            method: 'POST',
            headers: {
                'Client-ID': clientId,
            },
            body: raw
        });

        if (!response.ok) {
            throw new Error(`Error! Status: ${response.status}`);
        }
        const data = await response.json();
        const streamData = data[streamerName];
        if (streamData && streamData.type === 'live') {
            if (this.notification != true)
                chrome.notifications.create('notifyON Aayley', { type: "basic", title: 'Aayley', message: 'Aayley est en live', iconUrl: "images/iconon128.png" }, function (id) { });

            this.notification = true;
            chrome.action.setIcon({ path: "images/iconon48.png" });
            return true;
        } else {
            this.notification = false;
            chrome.action.setIcon({ path: "images/iconoff48.png" });
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

chrome.notifications.onClicked.addListener(function (notificationId) {
    if (notificationId === 'notifyON Aayley') {
        chrome.tabs.create({ url: url }, function (tab) { });
        chrome.notifications.clear("notifyON Aayley");
    }
});

chrome.action.onClicked.addListener(async () => {
    chrome.tabs.create({ url });
});

const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

getLiveStatus();
