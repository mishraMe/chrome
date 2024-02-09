
document.getElementById("timerBtn").addEventListener("click", startTimer);

function startTimer(){
var time = document.getElementById("time");
var timeVal = time.value;
setTimeout(showAlert, (timeVal * 1000), timeVal);
time.value = '';
}

function showAlert(timeVal){
alert("Show me after " + timeVal + " seconds");
}
