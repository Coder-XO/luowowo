$(function () {
    let str = window.location.search
    if (!str) {
        alert('没有id!')
        window.location.href = '../index.html'
    }
    let id = str.slice(4)
    // 请求数据
    $.ajax({
        url: 'http://kumanxuan1.f3322.net:8809/travels/detail',
        type: 'get',
        data: {
            id: id
        },
        success: (res) => {
            console.log(res)
            // 开始改数据
            // 标题
            $('.headtext').text(res.data.title)
            // 背景图片
            $('._j_load_cover').prop('style', `z-index: 1; opacity: 1; background: url("${res.data.coverUrl}");`)
            // 点赞数
            $('._j_up_num').text(res.data.thumbsupnum)
            //  日期时间
            $('.time').html(`出发时间<span>/</span>${res.data.releaseTime.substring(0, 10)}<i></i>`)
            // 出行天数
            $('.day').html(`出行日期<span>/</span>${res.data.day}天`)
            // 出行人物
            $('.people').html(`人物<span>/</span>${res.data.personDisplay}`)
            // 人均费用
            $('.cost').html(`人均费用<span>/</span>${res.data.perExpend}RMB`)
            // 文章内容
            $('.vc_articleT').html(res.data.content)
            // 作者创作时间
            $('span.time').text(res.data.releaseTime.substring(0, 10))
            //  阅读比上点赞
            $('.vc_time span').eq(1).html(`<i class="ico_view"></i>${res.data.viewnum}/${res.data.replynum}`)
            // 分享
            $('.bs_share span').eq(0).text(res.data.sharenum)
            // 点赞数
            $('.bs_collect span').eq(0).text(res.data.thumbsupnum)
            // 头像
            $('[data-cs-t=ginfo_person_operate] img:eq(0)').prop('src', `.${res.data.author.headImgUrl}`)
            //   作者名   城市名
            $('a.per_name').text(`${res.data.author.nickname}${res.data.author.city}`)
            // 等级
            $('a.per_grade').text(`level:${res.data.author.level}`)
        }
    })
})
