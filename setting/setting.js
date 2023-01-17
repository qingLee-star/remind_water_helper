var bgpage = chrome.extension.getBackgroundPage();

function VModel(data = {}, vm = {}, attr = 'attr', elementId = '') {
  Object.defineProperty(vm, attr, {
    set(val) {  // val是刚才给data[attr]更改的值
      // 当vm里的data[attr]更改的时候就触发set事件
      data[attr] = Number(val);
      document.getElementById([elementId]).value = val; // 把数据回传给data，不是回传给attr，否则会出现递归
    },
    get() {
      // 当要调用data[attr]的值的时候，获取到的值就是，从data里面拿到的值
      return data[attr];
    }
  });
  document.getElementById([elementId]).addEventListener('input', function (e) {
    // 把input标签里的值赋值给vm[attr]，让他调用Objet.defineProperty方法
    vm[attr] = e.target.value;
  });
}

/* // 定义变量,原本有一个data的,但是从bgpage.settingData赋值过来就不能双向绑定数据
var data = {
  frequencyTime: 30,
  restTime: 2
}; */
let vm = {}
// 双向绑定，当vm的值发生改变 会调用
VModel(bgpage.settingData, vm, 'frequencyTime', 'frequencyInput');
VModel(bgpage.settingData, vm, 'restTime', 'restInput');
// 初始化给input标签赋值
vm.frequencyTime = bgpage.settingData.frequencyTime || 0;
vm.restTime = bgpage.settingData.restTime || 0;


function setTimer() {
  var num = bgpage.settingData.frequencyTime; // 获取选择的倒计时时间
  bgpage.setAlarm(num * 60000); // 开始计时
}

// 点击保存
const saveBtn = document.getElementById('settingSave');
saveBtn.addEventListener('click', setTimer);