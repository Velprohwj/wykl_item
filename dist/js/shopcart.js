"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// 购物车功能
//1.从ajax请求数据对比输入的数据
ajax({
  method: 'post',
  url: 'http://www.qigexiaoairen.cn:3001/index/cart',
  data: {
    user: 'coder'
  }
}).then(function (data) {
  var data1 = JSON.parse(data);
  setdata(data1);
});

function setdata(data1) {
  var ul = document.querySelector('ul');
  var arr = data1.data;
  var str = '';

  var _iterator = _createForOfIteratorHelper(arr),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _step.value,
          name = _step$value.name,
          img = _step$value.img,
          price = _step$value.price,
          sum = _step$value.sum;
      str += "\n          <li>\n          <input class='choose'type='checkbox' name=\"\" id=\"\">\n          <div class=\"cartimg\">\n              <img src=\"".concat(img, "\" alt=\"\">\n          </div>\n          <div class=\"desc\">\n              <span>").concat(name, "</span>\n              <p>\u652F\u63017\u5929\u65E0\u7406\u7531\u9000\u8D27</p>\n          </div>\n          <span class=\"price\">").concat(price, "</span>\n          <div class=\"amount\">\n              <div class='reduce'>-</div>\n              <input type=\"text\" value=\"").concat(sum, "\">\n              <div class=\"add\">+</div>\n          </div>\n          <div class=\"sum\">69</div>\n          <div class=\"del\">\n              <a href=\"\">\u5220\u9664</a>\n              <p>\u79FB\u5165\u6211\u7684\u6536\u85CF</p>\n          </div>\n      </li>\n          ");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  ul.innerHTML = str;
}

function addTargetEvent() {} // ajax


function ajax(obj) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(obj.method, obj.url);

    if (obj.method.toLowerCase() === 'get') {
      obj.url += '?';

      for (var key in obj.data) {
        obj.url += "".concat(key, "=").concat(obj.data[key], "&");
      } // 避免浏览器缓存


      obj.url += "_=".concat(Date.now());
      obj.url = obj.url.slice(0, -1);
      xhr.send();
    }

    if (obj.method.toLowerCase() === 'post') {
      var str = '';

      for (var _key in obj.data) {
        str += "".concat(_key, "=").concat(obj.data[_key], "&");
      }

      str = str.slice(0, -1);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(str);
    }

    xhr.onreadystatechange = function () {
      // 判断状态值.0-4代表五种状态,4代表最终完成
      if (xhr.readyState === 4) {
        // 判断状态码
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        }

        reject('请求失败');
      }
    };
  });
}