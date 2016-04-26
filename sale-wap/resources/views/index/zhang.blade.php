<div class="m-index_news">
    <section class="news">
        <div class="title f-cb">
            <strong class="u-word f-fl">提车日记</strong>
            <a class="u-link f-fr">更多</a>
        </div>
        <ul class="list">
            <li ng-repeat="news_lists in news_list">
                <a href="@{{news_lists.link}}" class="f-cb">
                    <i class="img f-fl">
                        <img ng-src="@{{news_lists.images}}"/>
                    </i>
                    <dl class="text f-fl">
                        <dt ng-bind="news_lists.title"></dt>
                        <dd ng-bind="news_lists.desc"></dd>
                    </dl>
                </a>
            </li>
        </ul>
    </section>
    <section class="promise">
        <ul class="list f-cb">
            <li class="f-fl">
                <i class="icon">
                    <img src="/img/index/testIcon.jpg"/>
                </i>
                <strong>厂商直购</strong>
            </li>
            <li class="f-fl">
                <i class="icon">
                    <img src="/img/index/testIcon.jpg"/>
                </i>
                <strong>低价专供</strong>
            </li>
            <li class="f-fl">
                <i class="icon">
                    <img src="/img/index/testIcon.jpg"/>
                </i>
                <strong>杜绝加价</strong>
            </li>
            <li class="f-fl">
                <i class="icon">
                    <img src="/img/index/testIcon.jpg"/>
                </i>
                <strong>全国质保</strong>
            </li>
        </ul>
    </section>
    <section class="question">
        <div class="title f-cb">
            <a href="#">
                <strong class="u-word f-fl">问题反馈</strong>
                <i class="u-link f-fr"></i>
            </a>
        </div>
    </section>
    <section class="weixin">
        <dl class="f-cb">
            <dt class="f-fl">
                <img src="/img/index/weixinimg.jpg"/>
            </dt>
            <dd class="f-fl f-pr">
                 <i class="u-line"></i>
                 <p>长按关注快抢车微信<br/>快抢车微信号<br/>kuaiqiangche</p>
            </dd>
        </dl>
        <ul class="f-cb contact">
            <li class="f-fl">
                <a href="" class="tel">免费咨询</a>
            </li>
            <li class="f-fl">
                <i class="buy">底价买车</i>
            </li>
        </ul>
    </section>
</div>

