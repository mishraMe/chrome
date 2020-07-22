let breakTimeSwitch = document.getElementById('toggleSwitch');

chrome.storage.sync.get('toggl', function(data){
console.log(data.toggl);
breakTimeSwitch.innerHTML = data.toggl ? 'ON' : 'OFF';
});

breakTimeSwitch.onclick = function(element){
let nextState = element.target.innerHTML === 'ON' ? false : true;
chrome.storage.sync.set({'toggl' : nextState}, function(){
    console.log("the switch was set to : " + nextState);
    });
    window.close();
}