window.onload = function(){
    var minBox = document.querySelector('.Pinfowrap .minBox')
    var mask = document.querySelector('.Pinfowrap .minBox .mask')
    var maxBox = document.querySelector('.Pinfowrap .maxBox')
    var maxImg = document.querySelector('.Pinfowrap .maxBox img')

    // 获得元素到浏览器左侧和顶部的距离
    function offset(ele){
        let left = 0
        let top = 0
        while (ele) {
        left += ele.offsetLeft
        top += ele.offsetTop
        ele = ele.offsetParent
        }
        return { left, top }
    }

    // 鼠标移动，mask跟随移动
    minBox.onmousemove = function (ev){
    var e = ev || event
    // 计算msk的定位坐标
    var maskLeft = e.clientX - offset(minBox).left - mask.clientWidth/2
    var maskTop = e.clientY - offset(minBox).top - mask.clientHeight/2

    // 限制mask移动范围
    if (maskLeft < 0) {
    maskLeft = 0
    }
    if (maskLeft >= (minBox.clientWidth-mask.clientWidth)) {
    maskLeft = minBox.clientWidth-mask.clientWidth
    }
    if (maskTop < 0) {
    maskTop = 0
    }
    if (maskTop >= (minBox.clientHeight-mask.clientHeight)) {
    maskTop = minBox.clientHeight-mask.clientHeight
    }

    mask.style.left = maskLeft + 'px'
    mask.style.top = maskTop + 'px'

    var scaleX = maskLeft/(minBox.clientWidth-mask.clientWidth)
    var scaleY = maskTop/(minBox.clientHeight-mask.clientHeight)

    // 大图也跟随移动
    maxImg.style.left = -scaleX*(maxImg.clientWidth-maxBox.clientWidth) + 'px'
    maxImg.style.top = -scaleY*(maxImg.clientHeight-maxBox.clientHeight) + 'px'
    }

    minBox.onmouseenter = function (){
    mask.style.display = 'block'
    maxBox.style.display = 'block'
    }
    minBox.onmouseleave = function (){
    mask.style.display = 'none'
    maxBox.style.display = 'none'
    }
}