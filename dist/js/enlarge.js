"use strict";

function Enlarge(id) {
  //先获取大盒子
  this.ele = document.querySelector(id); //	获取 show盒子

  this.show = this.ele.querySelector('.show'); //	获取 mask盒子

  this.mask = this.ele.querySelector('.mask'); //	获取 enlarge盒子

  this.enlarge = this.ele.querySelector('.enlarge'); //	获取 list 盒子

  this.list = this.ele.querySelector('.list'); //	获取两个p标签

  this.ps = this.list.querySelectorAll('p'); //直接起动启动器

  this.init();
} //0.准备一个启动器（入口函数）


Enlarge.prototype.init = function () {
  this.overOut();
  this.setScale();
  this.maskMove();
  this.bindEvent();
}; //1.移入移出显示和隐藏


Enlarge.prototype.overOut = function () {
  var _this2 = this;

  //给show盒子绑定事件
  //	this.show.addEventListener('mouseover',function(){这里的this是指show盒子})
  //	this.show.addEventListener('mouseover',() => {这里的this是指当前实例,箭头函数this指向上下文this})
  this.show.addEventListener('mouseover', function () {
    //控制两个盒子显示
    _this2.mask.style.display = 'block';
    _this2.enlarge.style.display = 'block';
  });
  this.show.addEventListener('mouseout', function () {
    //控制两个盒子隐藏
    _this2.mask.style.display = 'none';
    _this2.enlarge.style.display = 'none';
  });
}; //2.让遮罩层跟着光标移动


Enlarge.prototype.maskMove = function () {
  var _this3 = this;

  this.show.addEventListener('mousemove', function (e) {
    e = e || window.event; //获取光标的位置 - box到左边和上面的距离

    var x = e.pageX - _this3.ele.offsetLeft - _this3.mask.clientWidth / 2;
    var y = e.pageY - _this3.ele.offsetTop - _this3.mask.clientHeight / 2; //获取遮罩层的宽和高

    var maskX = _this3.mask.offsetWidth;
    var maskY = _this3.mask.offsetHeight; //获取show盒子的宽和高

    var showX = _this3.show.offsetWidth;
    var showY = _this3.show.offsetHeight; //边界值判断

    if (x <= 0) {
      x = 0;
    }

    if (y <= 0) {
      y = 0;
    }

    if (x >= showX - maskX) {
      x = showX - maskX;
    }

    if (y >= showY - maskY) {
      y = showY - maskY;
    }

    _this3.mask.style.left = x + 'px';
    _this3.mask.style.top = y + 'px'; // 3.让大图跟着比例动
    //获取enlarge盒子尺寸

    var enlargeX = _this3.enlarge.offsetWidth;
    var enlargeY = _this3.enlarge.offsetHeight;
    var bgLeft = -x * enlargeX / maskX;
    var bgTop = -y * enlargeY / maskY;
    _this3.enlarge.style.backgroundPosition = "".concat(bgLeft, "px ").concat(bgTop, "px");
  });
}; // 4. 给两个p标签设置点击事件


Enlarge.prototype.bindEvent = function () {
  var _this = this;

  for (var i = 0; i < this.ps.length; i++) {
    this.ps[i].addEventListener('click', function () {
      _this.ps.forEach(function (item) {
        item.className = '';
      });

      this.className = 'active'; //this是p标签，获取绑定在img省上的两个自定义图片属性

      var showImgsrc = this.firstElementChild.getAttribute('data-show-src');
      var bgImgsrc = this.firstElementChild.getAttribute('data-bg-src');

      _this.show.firstElementChild.setAttribute('src', showImgsrc);

      _this.enlarge.style.backgroundImage = "url(".concat(bgImgsrc, ")");
    });
  }
}; // 3. 设置放大镜盒子成比例


Enlarge.prototype.setScale = function () {
  //获取遮罩层尺寸
  var maskX = parseInt(getComputedStyle(this.mask).width);
  var maskY = parseInt(getComputedStyle(this.mask).height); //获取show 盒子尺寸

  var showX = this.show.offsetWidth;
  var showY = this.show.offsetHeight; //获取背景图尺寸

  var bgX = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[0]);
  var bgY = parseInt(getComputedStyle(this.enlarge).backgroundSize.split(' ')[1]); //获取enlarge盒子尺寸

  var enlargeX = this.enlarge.offsetWidth;
  var enlargeY = this.enlarge.offsetHeight; //放大镜盒子 = 遮罩层 * 背景大图 / show盒子

  var x = maskX * bgX / showX;
  var y = maskY * bgY / showY;
  this.enlarge.style.width = x + 'px';
  this.enlarge.style.height = y + 'px';
};