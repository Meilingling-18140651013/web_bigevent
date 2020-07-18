//先在layui上获取表单的格式进行相关的修改,
//在对密码框表单验证,原密码大于六小于十二
//新密码  不能与原密码相同
//确认新密码  要与新密码相同
//给form表单绑定submit事件,在事件处理函数里取消默认行为,当数据进行修改后,通过ajax请求将数据提交,如果更新成功,更新表单,重新渲染

$(function(){
    //进行表单验证
    var form = layui.form

    form.verify ({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
        samPwd: function(value) {
            if( value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function(value) {
            if( value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'
            }
        }

    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if( res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })

})