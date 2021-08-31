$(() => {
    /*
        搜索框上部点击切换
    */
    $('ul.clearfix').children('li').click(function () {
        $(this).addClass('tab-selected').siblings().removeClass('tab-selected')
    })
    /*
        轮播图部分
     */
    // -------------------------------------------轮播图--------------------
    $.ajax({
        url: 'http://kumanxuan1.f3322.net:8809/index/banners/travel',
        success: (res) => {
            // 得到的数组
            let imgArray = res.data
            // 大图的获取
            let strBigImg = ``
            imgArray.forEach((item) => {
                // 模板字符串HTML
                strBigImg += `
                     <li data-id="0" class="show_image first" style="display: none;"><a
                            href="./traveldetail.html?id=5e3bf6a93f050000ff0035ec" class="show-pic"><img
                            src="${item.coverUrl}"></a> <a href="javascript:void(0);"
                                                                                      class="show-title dark">
                        <div class="date"><span class="day">27</span>/Aug.2021</div>
                        <h3>${item.title}</h3>
                    </a></li>
                `
            })
            // 小图的获取
            let strSmallImg = ``
            imgArray.forEach((item) => {
                strSmallImg += `
                <li class="show_nav"><a href="javascript:"><img src="${item.coverUrl}"
                                                                height="62" width="110">
                    <span></span></a></li>
                `
            })
            $('.show-image').html(strBigImg)      // 显示大图片了
            $('.show-nav').html(strSmallImg)     // 显示小图片了
            // 当前显示大图的下标
            let currentIndex = 0
            $('.show-image li').eq(currentIndex).show()
            $('.show-nav li').eq(currentIndex).addClass('active')
            //  自己轮播
            setInterval(function () {
                currentIndex++
                $('.show-image li').eq(currentIndex % 5).fadeIn().siblings().fadeOut()
                $('.show-nav li').eq(currentIndex).addClass('active').siblings().removeClass('active')
            }, 2000)

            // 点击右侧小图换图
            $('.show-nav li').click(function () {
                $(this).addClass('active').siblings().removeClass('active')
                // 点击显示对应的图片
                currentIndex = $(this).index()
                $('.show-image li').eq(currentIndex).show().siblings().hide()
            })
        }
    })
})
