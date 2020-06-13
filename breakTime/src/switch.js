let togglState;
chrome.storage.sync.set({toggl: false}, function () {
    console.log("I am called only once");
    togglState = false;
});
toggleSwitch.onclick = function toggeTheSwitch () {
    chrome.storage.sync.get(['toggl'], function(data){
        togglState = data.toggl;
    });
    chrome.storage.sync.set({toggl: !togglState}, function () {
        console.log("setting new value of toggl in storage to " + !togglState);
    });

};
