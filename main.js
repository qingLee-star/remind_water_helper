// 打开配置页面
const settingBtn = document.getElementById('setting');
settingBtn.addEventListener('click', () => {
  chrome.tabs.create({url: "/setting/setting.html"});
});

document.getElementById('btn').addEventListener('click', setTimer);

var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', () => {
	setTimer();
});

function show(section) {
  document.getElementById(section).style.display = "block";
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
    percent = bgpage.getTimeLeftPercent();
    if	(percent < 8) {
      document.getElementById("bar").style.color = "grey";
    } else {
      document.getElementById("bar").style.color = "white";
    }
    document.getElementById("bar").textContent = bgpage.getTimeLeftString();
    document.getElementById("bar").style.width = percent + "%";

    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
  } else {
    reset();
  }
}

function reset() {
  clearTimeout(refreshDisplayTimeout);
  bgpage.turnOff();
  document.body.style.minWidth = '240px'
}