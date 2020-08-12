//on install set a isOn value to false for switching the state
chrome.runtime.onInstalled.addListener(function(){
    chrome.storage.sync.set({isOn: false});
});

//this event fires every time any of the storage values is changed. in our case isOn button.
//we need a global variable that can be modified whenever the script needs to modify next Alarm time

chrome.storage.onChanged.addListener(function (changes, sync) {
    for (key in changes){
        let keyVal = changes[key]; // returns boolean value of toggle button
       if(key === 'isOn' && keyVal.newValue){
           chrome.alarms.create("break", {delayInMinutes: 30});
       }
       if(key === 'isOn' && !keyVal.newValue){
           chrome.alarms.clearAll();
       }
    }
});

 //this event fires an alarm every time the time elapses as decided on the alarm creation.
 //on break the break tab is created and on breakOver the tab is closed and alarm for next break is set.
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