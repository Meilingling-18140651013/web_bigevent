$(function(){
    //获取用户信息实在页面一加载的时候就获取
    getUserInfo()

    function getUserInfo(){
        $.ajax({
            
            url: '/my/userinfo',
            method: 'GET',
           
        success: res =>{
             console.log(res)
             //在用户获取信息成功后调用渲染头像的函数
             renderAvatar(res.data)
            }
        })
    }


    //封装渲染头像的函数
    function renderAvatar(user) {
        // 1. 获取用户的名称
        var name = user.nickname || user.username
        // 2. 设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3. 按需渲染用户的头像
        if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
        } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
        }
    }    
    //判断用户是否有 nickname .如果有作为欢迎词,没有就用username

    //判断是否也有user_pic属性,有,让img标签显示,并且设置src属性值为user_pic

    //如果没有user_pic 就取username的第一个字符,如果是英文,就改成大写,让文字头像显示
    
    var layer = layui.layer

      // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'

      // 关闭 confirm 询问框
      layer.close(index)
    })
  })

  // 不论成功还是失败，最终都会调用 complete 回调函数
complete: function(res) {
    // console.log('执行了 complete 回调：')
    // console.log(res)
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 1. 强制清空 token
      localStorage.removeItem('token')
      // 2. 强制跳转到登录页面
      location.href = '/login.html'
    }
  }
})

 