
chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({toggl: false}, function () {
        console.log("Installed with the bydefault value of false");
        togglState = false;
    });
});

//this event fires everytime any of the storage values is changed. in our case toggl button.
//we need a global variable that can be modified whenever the script needs to modify next Alarm time

chrome.storage.onChanged.addListener(function (changes, sync) {
    for (key in changes){
        let keyVal = changes[key]; // returns boolean if toggl button
       if(key === 'toggl' && keyVal.newValue){
           chrome.alarms.create("break", {delayInMinutes: 30});
       }
       if(key === 'toggl' && !keyVal.newValue){
           console.log("clearing this alarm");
           chrome.alarms.clearAll();
       }
    }
});

 //this event fires an alarm every time the time elapses as decided on the alarm creation.
    chrome.alarms.onAlarm.addListener(function(alarm){
        if(alarm.name === "break"){
            chrome.tabs.create({url: 'https://www.youtube.com/watch?v=dkedupX73xs', active: true}, function (tab){
                chrome.storage.sync.set({breakTabId: tab.id});
            });
            chrome.alarms.create("breakOver", {delayInMinutes : 10});
        }

        if(alarm.name === "breakOver"){
            chrome.storage.sync.get(['breakTabId'],
             function(data){
                chrome.tabs.remove(data.breakTabId);
            });
            chrome.storage.sync.remove("breakTabId");
            chrome.alarms.create("break", {delayInMinutes: 30});
        }

    });