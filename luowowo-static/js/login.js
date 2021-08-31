$(function () {
    let username = $('[name=username]').val().trim()
    let password = $('[name=password]').val().trim()
    $('#_js_loginBtn').on('click', function () {
        if (username && password) {
            $.ajax({
                url: 'http://kumanxuan1.f3322.net:8809/users/login',
                data: {
                    username,
                    password
                },
                type: 'post',
                success: (res) => {
                    console.log(res)
                    if (res.msg === '操作成功') {
                        // 登录校验id
                        localStorage.setItem('user', res.data.token)
                        location.href = './index.html'
                    } else {
                        alert('用户名或密码错误!')
                    }
                }
            })
        } else {
            alert('用户名或密码为空!')
        }
    })
})
