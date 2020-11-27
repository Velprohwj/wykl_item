"use strict";

$(function () {
  var win = $(window); //得到窗口对象

  var selector = $(".scroll-bar"); //获取导航对象

  var left = $("#left");
  console.log(left);
  var right = $(".rr");
  var height = 100; //设置距离顶部偏移量

  var line = 240;
  win.scroll(function () {
    if (win.scrollTop() >= height) {
      selector.slideDown(80).css('display', 'block');
    } else {
      selector.slideUp(80);
    }

    if (win.scrollTop() >= line) {
      left.addClass("left");
      right.addClass("right");
    } else {
      left.removeClass("left");
      right.removeClass("right");
    }
  });
  var top = $(".ttop")[0];
  console.log(top);

  top.onclick = function () {
    document.documentElement.scrollTop = 0;
  };
});