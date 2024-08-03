// 打开配置页面
const settingBtn = document.getElementById("setting");
settingBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: "/setting/setting.html" });
});

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", () => {
  setTimer();
  show("stop");
});

const stopBtn = document.getElementById("stop");
stopBtn.addEventListener("click", () => {
  reset();
  hide("display");
  hide("displayForWait");
  hide("stop");
  show("start");
});

var refreshDisplayTimeout;
var bgpage = chrome.extension.getBackgroundPage();

document.addEventListener("DOMContentLoaded", () => {
  refreshDisplay();
});

function show(id) {
  document.getElementById(id).style.display = "block";
}
function hide(id) {
  document.getElementById(id).style.display = "none";
}

function setTimer() {
  const num = bgpage.settingData.frequencyTime; // 获取选择的倒计时时间
  bgpage.setAlarm(num * 60 * 1000);
  document.body.style.minWidth = "420px";
  if(bgpage.alarmDate){
    show("display");
  }else if(bgpage.startAlarmDate){
    show("displayForWait");
  }
  refreshDisplay();
}

function refreshDisplay() {
  if (bgpage.alarmDate) {
    hide("start");
    hide("displayForWait");
    document.getElementById("titleDisplay").textContent =
      bgpage.settingData.title;
    document.getElementById("bar").style.color = "white";
    document.getElementById("bar").textContent = bgpage.getTimeLeftString();
    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
    show("display");
    return;
  }
  if (bgpage.startAlarmDate) {
    hide("start");
    hide("display");
    document.getElementById("titleDisplayForWait").textContent =
      bgpage.settingData.title;
    document.getElementById("barForWait").style.color = "white";
    document.getElementById("barForWait").textContent =
      bgpage.getTimeLeftString(false, bgpage.startAlarmDate);
    refreshDisplayTimeout = setTimeout(refreshDisplay, 100);
    show("displayForWait");
    return;
  }
  hide("display");
  hide("displayForWait");
  hide("stop");
  show("start");
  reset();
}

function reset() {
  clearTimeout(refreshDisplayTimeout);
  bgpage.turnOff();
  document.body.style.minWidth = "240px";
}
