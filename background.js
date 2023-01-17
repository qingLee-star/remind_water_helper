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
  alert(alarmDate.getTime() - setDate.getTime());
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

function ring() {
  var notificationOptions = {
    type: "basic",
    title: "Timer",
    message: "Time\'s up!",
    iconUrl: "img/tea-48.png",
    priority: 2,
    requireInteraction: true//, buttons: [{title: 'Repeat'}, {title: 'Snooze for 1m'}]
  }
  chrome.notifications.create(notificationOptions);

  turnOff();
}

function turnOff() {
  clearTimeout(alarmRingTimeout);
  clearInterval(updateBadgeTextInterval);
  userChosenDuration = 0;
  alarmDate = null;
  setDate = null;
  chrome.browserAction.setBadgeText({text: ""});
}

function error() {
  alert("Please enter a number between 1 and 240.");
}