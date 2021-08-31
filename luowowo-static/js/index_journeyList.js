/**
 *  邮游记列表部分
 */
$(function () {
    let journeyListArray    // 存放游记列表
    let totalPages    // 总页数
    //封装请求数据   并且渲染数据的函数
    function journeyList(orderType, currentPage) {
        $.ajax({
            url: 'http://kumanxuan1.f3322.net:8809/travels/query',
            data: {
                orderType: orderType,
                currentPage: currentPage
            },
            success: (res) => {
                totalPages = res.data.totalPages
                journeyListArray = res.data.content    // 数局获取完毕
                if (res.data.empty) {     //  最后一页判空
                    alert('这已经是最后一页了!!!!')
                }
                let journeyStr = ``    //  html字符串
                journeyListArray.forEach((item) => {
                    //   拼接字符串
                    journeyStr += `<div class="tn-item clearfix">
                                    <div class="tn-image"><a href="javascript:void(0);" target="_blank"><img
                                            src="${item.coverUrl}"
                                            style="display: inline;"></a></div>
                                    <div class="tn-wrapper">
                                        <dl>
                                            <dt><a href="./traveldetail.html?id=${item.id}"
                                                   target="_blank">${item.title}</a></dt>
                                            <dd><a href="./traveldetail.html?"
                                                   target="_blank">
                                                ${item.summary}
                                            </a></dd>
                                        </dl>
                                        <div class="tn-extra"><span class="tn-ding"><a href="javascript:void(0);"
                                                                                       data-japp="articleding"
                                                                                       data-iid="12451790"
                                                                                       data-vote="2157"
                                                                                       rel="nofollow"
                                                                                       class="btn-ding"></a> <em
                                                id="topvote12451790">${item.thumbsupnum}</em></span> <span
                                                class="tn-place"><i></i> <a href="javascript:void(0);"
                                                                            rel="nofollow" class="_j_gs_item">
                                                        ${item.destName}</a>，by
                                                </span> <span class="tn-user"><a href="javascript:void(0);"
                                                                                 target="_blank" rel="nofollow"><img
                                                src="./images/default.jpg">
                                                        ${item.author.nickname}
                                                    </a></span> <span class="tn-nums"><i></i>${item.viewnum}/${item.favornum}</span></div>
                                    </div>
                                </div>`
                })
                $('.tn-list').html(journeyStr)    // 渲染html
            }
        })
    }


    // 保存当前的排序类型
    let currentOrderType = 2
    //保存当前页
    let currentPages = 1
    journeyList(currentOrderType, currentPages)   //  默认显示第一页的  按照热度排序的

    // 热度顺序 和 世间顺序的切换
    $('ul#_j_tn_nav li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        if ($(this).index() === 0) {   // 点击的第一个
            currentOrderType = 2
            journeyList(currentOrderType, currentPages)
        } else {
            currentOrderType = 1
            journeyList(currentOrderType, currentPages)
        }
    })

    // 换页的功能
    for (let i = 1; i <= 3; i++) {
        $('#pagination a').eq(i).click(function () {     // 第几页
            $(this).addClass('active').siblings().removeClass('active')
            currentPages = i
            journeyList(currentOrderType, currentPages)
        })
    }
    //  上一页
    $('#pagination a').eq(0).click(function () {
        if (currentPages <= 1) {
            alert('已经是第一页了!')
            return undefined
        }
        currentPages--
        $('#pagination a').eq(currentPages).addClass('active').siblings().removeClass('active')
        journeyList(currentOrderType, currentPages)
    })

    // 下一页
    $('#pagination a').eq(4).click(function () {
        if (currentPages >= totalPages) {
            alert('已经是最后一页了!')
            return undefined
        }
        currentPages++
        $('#pagination a').eq(currentPages).addClass('active').siblings().removeClass('active')
        journeyList(currentOrderType, currentPages)
    })

    // 尾页
    $('#pagination a').eq(5).click(function () {
        currentPages = totalPages   // 直接等于最大页数
        $('#pagination a').eq(currentPages).addClass('active').siblings().removeClass('active')
        journeyList(currentOrderType, currentPages)
    })
})
