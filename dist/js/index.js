"use strict";

window.addEventListener('load', function () {
  // 第一步,在imglist的最前面插入最后一张图片,在最后面插入第一张图片
  // 第二步,根据图片数量动态生成btnlist小圆圈
  // 三.获取页面上的元素
  var section = document.querySelector(".banner > section");
  var wrap = document.querySelector('.banner section .wrap'); // let imglist = document.querySelector('.imglist')
  // let btnList = document.querySelector('.btnlist')

  var imgs = document.querySelectorAll('.banner .imglist > a');
  var btns = document.querySelectorAll('.banner  .btnlist > a');
  var leftctrl = document.querySelector('.banner .leftctrl');
  var rightctrl = document.querySelector('.banner  .rightctrl'); // 取wrap的宽度作为每次切换图片移动的距离

  var tabSize = wrap.clientWidth; // 记录当前图片位置的下标

  var imgIndex = 0;
  var timer;
  scroll(); //左右按钮函数

  function scroll() {
    rightctrl.onclick = function () {
      imgIndex++;

      if (imgIndex > imgs.length - 1) {
        wrap.scrollLeft = 0;
        imgIndex = 1;
      }

      animate(wrap, {
        scrollLeft: imgIndex * tabSize
      });
      circlecolor();
    };

    leftctrl.onclick = function () {
      imgIndex--;

      if (imgIndex < 0) {
        wrap.scrollLeft = (imgs.length - 1) * tabSize;
        imgIndex = imgs.length - 2;
      }

      animate(wrap, {
        scrollLeft: imgIndex * tabSize
      });
      circlecolor();
    };
  } //让小圆点颜色与当前显示图片保持一致


  function circlecolor() {
    //取消所有小圆点的颜色
    btns.forEach(function (it) {
      it.style.backgroundColor = '#000';
    });
    btns[imgIndex % (imgs.length - 1)].style.backgroundColor = '#00f';
  } //每两秒右键点击一次完成自动播放


  auto();

  function auto() {
    timer = setInterval(function () {
      rightctrl.onclick();
    }, 2000);
    section.addEventListener('mouseenter', function () {
      clearInterval(timer);
    });
    section.addEventListener('mouseleave', function () {
      timer = setInterval(function () {
        rightctrl.onclick();
      }, 2000);
    });
  }

  btnclick(); //点击按钮切换

  function btnclick() {
    btns.forEach(function (item, index) {
      item.onclick = function () {
        imgIndex = index;
        ;
        animate(wrap, {
          scrollLeft: index * tabSize
        });
        btns.forEach(function (it) {
          it.style.backgroundColor = '#000';
        });
        item.style.backgroundColor = '#00f';
      };
    });
  } // 封装的动画函数


  function animate(dom, options, callback) {
    // 遍历对象属性
    for (var attr in options) {
      // 获取元素当前的attr值
      if (attr === 'opacity') {
        // 获取当前元素的透明度*100
        var current = parseInt(getComputedStyle(dom)[attr] * 100);
        var target = options[attr] * 100;
      } else if (attr.indexOf('scroll') !== -1) {
        var current = dom[attr];
        var target = options[attr];
      } else {
        var current = parseInt(getComputedStyle(dom)[attr]);
        var target = options[attr];
      }

      options[attr] = {
        current: current,
        target: target
      };
    }

    clearInterval(dom.timer);
    dom.timer = setInterval(function () {
      // 遍历对象，取出数据
      for (var attr in options) {
        var current = options[attr].current;
        var target = options[attr].target; // 持续变化的速度

        var speed = (target - current) / 10; // 浮点数计算会造成结果有偏差，可能造成数据丢失：取整
        // 判断运动方向取整

        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 临界值判断：剩余运动量<=每次的运动量

        if (Math.abs(target - current) <= Math.abs(speed)) {
          // 到达终点
          if (attr === 'opacity') {
            dom.style[attr] = target / 100; // 立即到达终点
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = target;
          } else {
            dom.style[attr] = target + 'px';
          } // 删除已运动完成的属性


          delete options[attr];

          for (var attr in options) {
            // 还有其他属性没运动完成，提前结束当前程序，不清除计时器
            return false;
          } //如果有回调函数，则执行回调函数


          typeof callback === 'function' ? callback() : '';
          clearInterval(dom.timer); // 清除计时器
        } else {
          // 未到达终点
          options[attr].current += speed;

          if (attr === 'opacity') {
            dom.style[attr] = options[attr].current / 100;
          } else if (attr.indexOf('scroll') !== -1) {
            dom[attr] = options[attr].current;
          } else {
            dom.style[attr] = options[attr].current + 'px';
          }
        }
      }
    }, 20);
  }
});