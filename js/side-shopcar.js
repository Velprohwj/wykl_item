window.onload = function(){
    let side = document.querySelector('.guess-top')
    window.addEventListener('scroll',function(){
        if(window.pageYOffset>240){
            side.style.display = 'block'
            side.style.position = 'fixed'    
            // side.style.top = window.pageYOffset + 500 + 'px'
        }else{
            side.style.display = 'none'
            // side.style.top = '500px'
        }
    })
    backToTop(side)
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