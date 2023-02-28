// 打开配置页面
const settingBtn = document.getElementById('setting');
settingBtn.addEventListener('click', () => {
  chrome.tabs.create({url: "/setting/setting.html"});
});

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
  setTimer();
  show("stop");
});

const stopBtn = document.getElementById('stop');
stopBtn.addEventListener('click', () => {
  reset();
  hide("display");
  hide("stop");
  show("start");
});

var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', () => {
  refreshDisplay();
});

function show(id) {
  document.getElementById(id).style.display = "block";
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}

function setTimer() {
  var num = bgpage.settingData.frequencyTime; // 获取选择的倒计时时间
  bgpage.setAlarm(num * 60000);
  document.body.style.minWidth = '420px'
	show("display");
  refreshDisplay();
}

function refreshDisplay() {
  if(bgpage.alarmDate) {
    hide("start");
    document.getElementById("titleDisplay").textContent = bgpage.settingData.title;
    document.getElementById("bar").style.color = "white";
    document.getElementById("bar").textContent = bgpage.getTimeLeftString();
    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
    show("display");
  } else {
    hide("display");
    hide("stop");
    show("start");
    reset();
  }
}

function reset() {
  clearTimeout(refreshDisplayTimeout);
  bgpage.turnOff();
  document.body.style.minWidth = '240px'
}