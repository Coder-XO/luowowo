$(function () {
    // 1.注册验证   验证手机号码
    // 1.  点击  立即注册按钮   注册点击事件
    // 2. 点击按钮获文本框的内容
    // 3. 将手机号码发送到服务器  检查手机号码是否被注册

    //  手机号
    let phone
    $('#_js_loginBtn').on('click', () => {
        // 如果不为空
        if ($('#inputPassword').val().trim()) {
            // 发请求检测号码是否可用
            $.ajax({
                url: 'http://kumanxuan1.f3322.net:8809/users/checkPhone',
                data: {
                    phone: $('#inputPassword').val().trim()
                },
                success: (res) => {
                    // 如果可以注册
                    if (res.data === true && res.msg === "操作成功") {
                        phone = $('#inputPassword').val().trim()   // 把手机号码存一下
                        $('#_j_login_box').fadeOut()
                        $('.signup-box').fadeIn()
                    } else if (res.msg === "请输入手机号码!") {
                        alert('手机号码格式不正确!')
                    } else if (res.data === false && res.msg === "操作成功") {   //已经注册过了
                        window.location.href = './login.html'
                    }
                }
            })
        } else {
            alert('输入内容为空!')
        }
    })


    //  注册功能
    $('.submit-btn button[type=submit]').on('click', function (e) {
        e.preventDefault()
        let nickname = $('[name=nickname]').val().trim()
        let password = $('[name=password]').val().trim()
        let rpassword = $('[name=rpassword]').val().trim()
        let verifyCode = $('[name=verifyCode]').val().trim()

        if (nickname && password && rpassword && verifyCode) {    // 都不为空的时候
            $.ajax({
                type: 'post',
                data: {
                    phone,
                    nickname,
                    password,
                    rpassword,
                    verifyCode
                },
                url: "http://kumanxuan1.f3322.net:8809/users/regist",
                success: (res) => {
                    console.log(res)
                    if (res.msg === "操作成功" && res.data === null) {
                        alert('注册成功!')
                        location.href = './login.html'
                    }
                }
            })
        } else {
            alert('还有信息没输入!')
        }
    })
})
