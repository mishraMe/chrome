let breakTimeSwitch = document.getElementById('toggleSwitch');

chrome.storage.sync.get('isOn', function(data){
breakTimeSwitch.innerHTML = data.isOn ? 'STOP' : 'START';
});

breakTimeSwitch.onclick = function(element){
let nextState = element.target.innerHTML === 'STOP' ? false : true;
chrome.storage.sync.set({'isOn' : nextState}, function(){
    });
    window.close();
}