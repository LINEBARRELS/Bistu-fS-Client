var electron = require('electron')

var ipc = electron.ipcRenderer;

var panel = document.querySelectorAll('.panel');
var form = document.querySelector('.form')

  function checkLetter(str) {
    var reg = new RegExp('\\W', 'g');
    var result = str.match(reg) === null
      ? true
      : false;
    return result;
  }

  function checkLength(str) {

    var result = str.length >= 4 && str.length <= 15;
    return result;
  }

  panel[0].addEventListener('click', (event) => {
    if (event.target.tagName === 'DIV') {
      disableClass(panel, 'on');
      event.target.classList.add('on');
      form.classList.remove('form-right')
    }

  })

  panel[1].addEventListener('click', (event) => {
    if (event.target.tagName === 'DIV') {
      disableClass(panel, 'on');
      event.target.classList.add('on');
      form.classList.add('form-right')
    }
  })

  function disableClass(elem, className) {
    for (let i of elem) {
      i.classList.remove(className)
    }
  }

  var login = document.querySelectorAll('button')[0],
    regist = document.querySelectorAll('button')[1];

  var user = document.querySelectorAll('input')[0],
    pass = document.querySelectorAll('input')[1],
    cofm = document.querySelectorAll('input')[2];

  var close = document.querySelector('header span');

  user.addEventListener('change', function(event) {
    this.classList.remove('err');
    this.nextElementSibling.innerText = '';

    try {
      if (!checkLetter(this.value))
        throw '包含非法字符'
      if (!checkLength(this.value))
        throw '长度不科学'
    } catch (err) {
      this.classList.add('err');
      this.nextElementSibling.innerText = err;
    }
  })

  cofm.addEventListener('change', function(event) {
    this.classList.remove('err');
    this.nextElementSibling.innerText = '';
    try {
      if (!checkLetter(this.value))
        throw '包含非法字符'
      if (!checkLength(this.value))
        throw '长度不科学'
      if (this.value !== pass.value)
        throw '两次输入密码不相同,请重新输入'
    } catch (err) {
      this.classList.add('err');
      this.nextElementSibling.innerText = err;
    }

  })

  login.addEventListener('click', function(event) {
    event.preventDefault();
    // ipc.send('success','zero')
    login.disabled = true;
    var head = new Headers()
    head.set('username', user.value);
    head.set('password', pass.value);

    fetch("http://localhost:8080/login", {
      method: 'post',
      headers: head
    }).then(function(response) {
      console.log('response!');
      if (response.status !== 200) {
        console.log("存在一个问题，状态码为：" + response.status);
        return;
      }
      //检查响应文本
      response.json().then(function(data) {
        if (data.loginResult === 'success') {
          ipc.send('success', user.value, data.uid)
        } else {
          alert('登录失败')
          login.disabled = false;
        }
      })
    }, function(reject) {
      throw reject
    }).catch(function(err) {
      console.log("Fetch错误:" + err);
    });

  });

  regist.addEventListener('click', function(event) {
    event.preventDefault();
    // ipc.send('success','zero')
    regist.disabled = true;
    var head = new Headers()
    head.set('username', user.value);
    head.set('password', pass.value);
    fetch("http://localhost:8080/reg", {
      method: 'post',
      headers: head
    }).then(function(response) {
      if (response.status !== 200) {
        console.log("存在一个问题，状态码为：" + response.status);
        return;
      }
      //检查响应文本
      response.json().then(function(data) {
        if (data.registResult === 'success') {
          alert('注册成功~')
          regist.disabled = false;
        } else {
          alert('注册失败');
          regist.disabled = false;
        }
      })
    }).catch(function(err) {
      console.log("Fetch错误:" + err);
    });
  });

  close.addEventListener('click', function(event) {
    ipc.send('quit');
  })

  // var form = new FormData();
  // form.append('username',123);
  // form.append('password',123);
