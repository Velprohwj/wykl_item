let ul = document.querySelector('.goods-main')
// let lis = document.querySelectorAll('.goods-main>li')
ul.onclick = function(e){
    let target = e.target
    if(target.className==='.good-div'){
        location.assign('./detail.html')
    }
}