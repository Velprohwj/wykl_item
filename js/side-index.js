window.onload = function(){
    let side = document.querySelector('.side')
    window.addEventListener('scroll',function(){
        if(window.pageYOffset>700){
            side.style.top = window.pageYOffset + 68 + 'px'
        }else{
            side.style.top = '768px'
        }
    })

    let Topfix = document.querySelector('.Topfix')
    window.addEventListener('scroll',function(){
        if(window.pageYOffset > 50){
            Topfix.style.position = 'fixed'
            Topfix.style.display = 'block'
        }else{
            Topfix.style.display = 'none'
        }
    })
}

function backToTop(ele) {
    ele.onclick = function () {
      let timer = setInterval(() => {
        document.documentElement.scrollTop -= 100
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(timer)
        }
      }, 15)
    }
  }