//登录功能
  //1.获取元素
  var txt = document.querySelector('.login-content .user')
  var pwd = document.querySelector('.login-content .pass')
  var button = document.querySelector('.login-content .login')
  //2.从ajax请求数据对比输入的数据，点击登录按钮跳转页面
  button.addEventListener('click', function () {
    ajax({
      method: 'POST',
      url: 'http://www.qigexiaoairen.cn:3001/index/login/',
      data: {
        num: txt.value,
        pwd: pwd.value,
      },
    }).then((res) => {
      console.log(res)
      console.log(txt.value, pwd.value)
      let res1 = JSON.parse(res)
      setCookie(res1)
    })
    function setCookie(data) {
      if (data.err == -1) {
        console.log(1111)
        history.go(0)
      } else {
        localStorage.setItem('username', txt.value)
        localStorage.setItem('pwd', pwd.value)
        location.assign('index.html')
      }
    }
    // localStorage.setItem('username',txt.value)
    // localStorage.setItem('pwd',pwd.value)
    // location.assign('index.html')
  })
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