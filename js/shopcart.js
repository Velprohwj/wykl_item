// 购物车功能

  //1.从ajax请求数据对比输入的数据
  ajax({
    method:'post',
    url:'http://www.qigexiaoairen.cn:3001/index/cart',
    data:{user: 'coder'},
  }).then((data) => {
      let data1 = JSON.parse(data)
      setdata(data1)
  })
  function setdata(data1){
      let ul = document.querySelector('ul')
      let arr = data1.data
      var str = ''
      for(const{name,img,price,sum} of arr ){
          str +=`
          <li>
          <input class='choose'type='checkbox' name="" id="">
          <div class="cartimg">
              <img src="${img}" alt="">
          </div>
          <div class="desc">
              <span>${name}</span>
              <p>支持7天无理由退货</p>
          </div>
          <span class="price">${price}</span>
          <div class="amount">
              <div class='reduce'>-</div>
              <input type="text" value="${sum}">
              <div class="add">+</div>
          </div>
          <div class="sum">69</div>
          <div class="del">
              <a href="">删除</a>
              <p>移入我的收藏</p>
          </div>
      </li>
          `
      }
      ul.innerHTML = str  
  }
  
  function addTargetEvent(){
      
  }




// ajax
function ajax(obj) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(obj.method, obj.url)
    if (obj.method.toLowerCase() === 'get') {
      obj.url += '?'
      for (let key in obj.data) {
        obj.url += `${key}=${obj.data[key]}&`
      }
      // 避免浏览器缓存
      obj.url += `_=${Date.now()}`
      obj.url = obj.url.slice(0, -1)
      xhr.send()
    }
    if (obj.method.toLowerCase() === 'post') {
      let str = ''
      for (let key in obj.data) {
        str += `${key}=${obj.data[key]}&`
      }
      str = str.slice(0, -1)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send(str)
    }
    xhr.onreadystatechange = function () {
      // 判断状态值.0-4代表五种状态,4代表最终完成
      if (xhr.readyState === 4) {
        // 判断状态码
        if (xhr.status === 200) {
          resolve(xhr.responseText)
        }
        reject('请求失败')
      }
    }
  })
}