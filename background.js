var alarmRingTimeout;
var updateBadgeTextInterval;
var userChosenDuration;
var setDate;
var alarmDate;
var guiLagAdjustment = 500;
// 默认的配置值
var settingData = {
  frequencyTime: 30,
  restTime: 2
};

function setAlarm(tMillis) {
  userChosenDuration = tMillis;
  ringIn(tMillis + guiLagAdjustment);
}

function ringIn(tMillis) {
  clearTimeout(alarmRingTimeout);
  clearInterval(updateBadgeTextInterval);

  var tSecs = parseInt(tMillis / 1000);
  var tMins = parseInt(tSecs / 60);
  var secs = tSecs % 60;
  var tHrs = parseInt(tMins / 60);
  var mins = tMins % 60;
  var millis = tMillis % 1000;

  alarmDate = new Date();
  // alarmDate.setTime(alarmDate.getTime() + millis);
  alarmDate.setHours(alarmDate.getHours() + tHrs);
  alarmDate.setMinutes(alarmDate.getMinutes() + mins);
  alarmDate.setSeconds(alarmDate.getSeconds() + secs);
  alarmDate.setMilliseconds(alarmDate.getMilliseconds() + millis);

  setDate = new Date();
  // alert(alarmDate.getTime() - setDate.getTime());
  alarmRingTimeout = setTimeout(ring, alarmDate.getTime() - setDate.getTime());

  updateBadgeTextInterval = setInterval(function() {
      chrome.browserAction.setBadgeText({text: getTimeLeftBadgeString()});
  }, guiLagAdjustment);
}

function getTimeLeft(){
  var now = new Date();
  return (alarmDate.getTime() - now.getTime());
}

function getTimeLeftPercent() {
  return parseInt(getTimeLeft() / userChosenDuration * 100);
}

function getTimeLeftString() {
  var until = getTimeLeft();
  var tSecs = parseInt(until / 1000);
  var tMins = parseInt(tSecs / 60);
  var secs = tSecs % 60;
  var tHrs = parseInt(tMins / 60);
  var mins = tMins % 60;
  if(secs < 10) secs = "0" + secs;
  if(mins < 10) mins = "0" + mins;
  if(tHrs < 10) tHrs = "0" + tHrs;
  return ((tHrs > 0 ? tHrs + ":" : "") + mins + ":" + secs);
}

function getTimeLeftBadgeString() {
  var until = getTimeLeft();
  var tSecs = parseInt(until / 1000);
  var tMins = parseInt(tSecs / 60);
  var secs = tSecs % 60;
  var tHrs = parseInt(tMins / 60);
  var mins = tMins % 60;

  if (tHrs > 0) {
    return tHrs + 'hr';
  } else if (tMins > 0) {
    return tMins + 'm';
  } else {
    return tSecs + 's';
  }
}

let notification = null;
function ring() {
  var notificationOptions = {
    type: "basic",
    title: "喝水小助手提醒您：",
    message: "喝水时间到啦！",
    iconUrl: "img/tea-48.png",
    priority: 2,
    requireInteraction: true//, buttons: [{title: 'Repeat'}, {title: 'Snooze for 1m'}]
  }
  chrome.notifications.create(notificationOptions);
  turnOff();
}
chrome.notifications.onClosed.addListener(() => {
  var num = settingData.frequencyTime; // 获取选择的倒计时时间
  setAlarm(num * 60000); // 开始计时
});

function turnOff() {
  clearTimeout(alarmRingTimeout);
  clearInterval(updateBadgeTextInterval);
  userChosenDuration = 0;
  alarmDate = null;
  setDate = null;
  chrome.browserAction.setBadgeText({text: ""});
}