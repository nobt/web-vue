/* 
* author: lilin
* time: 2019-2-27
*/
'use strict';

(function (RongIM, dependencies, components) {
    var $ = dependencies.jQuery;
    var Vue = dependencies.Vue;
    var VueRouter = dependencies.VueRouter; 

    // 初始化路由
    var router = new VueRouter({
        routes: RongIM.routes.maps
    })
    // VUE初始化
    new Vue({
        el: '#rong-im-app',
        router: router,
        data: function(){
            return {
                msg: '这就是一个简单的demo测试！'
            }
        }
    });

})(RongIM, {
    jQuery : jQuery,
    Vue: Vue,
    VueRouter: VueRouter,
    win: window 
}, RongIM.components);

