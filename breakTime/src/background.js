chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({toggl: false}, function () {
        console.log("Installed with the bydefault value of false");
        togglState = false;
    });
});

//this event fires everytime any of the storage values is changed. in our case toggl button.
chrome.storage.onChanged.addListener(function (changes, sync) {
    console.log("a storage value changed");
    for (key in changes){
        let keyVal = changes[key]; // returns boolean if toggl button
       if(key === 'toggl' && keyVal.newValue){
           chrome.alarms.create("break", {periodInMinutes: 1});
       }
       if(key === 'toggl' && !keyVal.newValue){
           console.log("clearing this alarm");
           chrome.alarms.clear("break");
       }
    }
});

 //this event fires an alarm everytime the time elapses as decided on the alarm creation.
    chrome.alarms.onAlarm.addListener(function(alarm){
        chrome.tabs.create({url: 'https://www.youtube.com/watch?v=dkedupX73xs', active: true}, function (tab) {
            console.log("tab info for the tab just opened is " + tab);
        })
    });