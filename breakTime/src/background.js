
//this event fires everytime any of the storage values is changed. in our case toggl button.
chrome.storage.onChanged.addListener(function (changes, sync) {
    for (key in changes){
        var keyVal = changes[key]; // returns boolean if toggl button
       if(key === 'toggl' && keyVal){
           chrome.alarms.create("break", {delayInMinutes: 10, periodInMinutes: 30})
       }
    }
    //this event fires an alarm everytime the time elapses as decided on the alarm creation.
    chrome.alarms.onAlarm.addListener(function(alarm){
        console.log("Got an alarm!", alarm);
        chrome.tabs.create({url: 'https://www.youtube.com/watch?v=dkedupX73xs', active: true}, function (tab) {
            console.log("tab info for the tab just opened is " + tab);
        })
    })
});