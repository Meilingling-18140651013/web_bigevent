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

//从layui中获取form对象
var form = layui.form
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