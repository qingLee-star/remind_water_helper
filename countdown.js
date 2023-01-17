

//获取元素
var hour = document.querySelector(".hour");
var minute = document.querySelector(".minute");
var second = document.querySelector(".second");
// 获取截止时间的时间戳（单位毫秒）
// var inputTime = +new Date("2023-01-16 16:10:00");
const config = chrome.extension.getBackgroundPage().data;
console.log(config);
var inputTime = new Date().getTime() + config.frequencyTime*60*1000;
console.log(chrome.extension.getBackgroundPage().data);

//我们先调用countDown函数，可以避免在打开界面后停一秒后才开始倒计时
countDown();
//定时器 每隔一秒变化一次
setInterval(countDown, 1000);
function countDown() {
  var nowTime = +new Date();
  //把剩余时间毫秒数转化为秒
  var times = (inputTime - nowTime) / 1000;
  //计算小时数 转化为整数
  var h = parseInt(times / 60 / 60 % 24);
  //如果小时数小于 10，要变成 0 + 数字的形式 赋值给盒子
  hour.innerHTML = h < 10 ? "0" + h : h;
  //计算分钟数 转化为整数
  var m = parseInt(times / 60 % 60);
  //如果分钟数小于 10，要变成 0 + 数字的形式 赋值给盒子
  minute.innerHTML = m < 10 ? "0" + m : m;
  //计算描述 转化为整数
  var s = parseInt(times % 60);
  //如果秒钟数小于 10，要变成 0 + 数字的形式 赋值给盒子
  second.innerHTML = s < 10 ? "0" + s : s;
}

/* function ring(){
  var notificationOptions = {
      type: "basic",
      title: "该喝水啦！",
      message: "Time\'s up!",
      iconUrl: "img/tea-48.png",
      priority: 2,
      requireInteraction: true//, buttons: [{title: 'Repeat'}, {title: 'Snooze for 1m'}]
  }
  chrome.notifications.create(notificationOptions);
}

function getLeftText() {
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

function ringIn(tMillis) {
  clearTimeout(alarmTimeout);
  clearInterval(textInterval);
  pauseDate = null;
  
  var seconds = parseInt(tMillis / 1000);
  var mins = parseInt(seconds / 60);
  var second = seconds % 60;
  var hour = parseInt(mins / 60);
  var min = mins % 60;
  var millis = tMillis % 1000;
  
  alarmDate = new Date();
  // alarmDate.setTime(alarmDate.getTime() + millis);
  alarmDate.setHours(alarmDate.getHours() + hour);
  alarmDate.setMinutes(alarmDate.getMinutes() + min);
  alarmDate.setSeconds(alarmDate.getSeconds() + second);
  alarmDate.setMilliseconds(alarmDate.getMilliseconds() + millis);

  setDate = new Date();

  alarmTimeout = setTimeout(ring, alarmDate.getTime() - setDate.getTime());

  textInterval = setInterval(function() {
      chrome.browserAction.setBadgeText({text: getLeftText()});
  }, 500);
} */
