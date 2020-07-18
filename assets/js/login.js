$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})

//从layui中获取form对象  要使用layui.form必须要先引用layui的js才可以使用
var form = layui.form
var layer = layui.layer
//通过 form.verity() 函数自定义校验规则
form.verify({
    //自定义了一个叫做哦 pwd的校验规则
    pwd:[
        /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
      ],
      //检验两次密码是否一致的规则
      repwd: function(value) {
          //通过形参拿到的是确认密码框中的内容，
          //还需要密码框中的内容，在进行等于的判断
          //if 判断失败，则return 一个提示消息
          var pwd = $('.reg-box [name=password]').val();
          if(pwd !== value ) {
              return '两次密码不一致！'
          }
      }
})

$('#form_reg').on('submit',function(e){
    e.preventDefault()
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val(),
    }
    $.post('/api/reguser',data,function(res){
        if(res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        //模拟人的点击行为
        &('#link_login').click()
    })
})

$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0 ) {
                return layer.msg('登录失败')
            }
            layer.msg('登录成功')
            localStorage.setItem('token'.res.token)
            location.href = '/index.html'
        }
       
    })
})
