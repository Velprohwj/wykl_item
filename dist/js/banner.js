"use strict";

var section = document.querySelector('.banner');
var wrap = document.querySelector('.banner .wrap');
var imglist = document.querySelector('.banner  .imglist');
var btnList = document.querySelector('.banner  .btnlist');
var imgs = document.querySelectorAll('.banner  .imglist > a');
var btns = document.querySelectorAll('.banner .btnlist > a');
var leftctrl = document.querySelector('.banner  .leftctrl');
var rightctrl = document.querySelector('.banner .rightctrl'); // 取wrap的宽度作为每次切换图片移动的距离

var tabSize = wrap.clientWidth; // let tabSize = imglist.clientWidth / 5
// 记录当前图片位置的下标

var imgIndex = 0;
leftRight();
autoPlay();
btnClick(); //左右按钮滚动

function leftRight() {
  rightctrl.onclick = function () {
    imgIndex++;

    if (imgIndex > imgs.length - 1) {
      wrap.scrollLeft = 0;
      imgIndex = 1;
    }

    animate(wrap, {
      scrollLeft: imgIndex * tabSize
    });
    sameTo();
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
    sameTo();
  };
} //让小圆点的颜色跟随图片切换


function sameTo() {
  btns.forEach(function (item1) {
    item1.style.backgroundColor = '#fff';
  });
  btns[imgIndex % (imgs.length - 1)].style.backgroundColor = '#ff1e32';
} //自动播放


function autoPlay() {
  var timer = setInterval(function () {
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
  sameTo();
} //点击按钮切换


function btnClick() {
  btns.forEach(function (item, index) {
    item.onclick = function () {
      imgIndex = index;
      animate(wrap, {
        scrollLeft: index * tabSize
      });
      btns.forEach(function (item1) {
        item1.style.backgroundColor = '#000';
      });
      item.style.backgroundColor = '#00f';
    };
  });
} // let nav_l = document.querySelector('.nav_l')
// let catal = document.querySelector('.catal')
// window.onload = function(){
//   catal.style.display = 'none'
// }
// nav_l.onclick = function(){
//   catal.style.display = 'block'
// }
// var mySwiper = new Swiper ('.swiper-container', {
//   // direction: 'vertical', // 垂直切换选项
//   loop: true, // 循环模式选项
//   // 如果需要分页器
//   pagination: {
//     el: '.swiper-pagination',
//   },
//   // 如果需要前进后退按钮
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   // 如果需要滚动条
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
// })