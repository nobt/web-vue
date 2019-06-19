/* 
* author: lilin
* time: 2019-2-27
*/
(function (RongIM, dependencies, components) {
	var $ = dependencies.jQuery;
	var utils = RongIM.utils;

	/**
	* test组件
	*/
	components.test = function(resolve, reject){
		var options = {
			template: 'tpl/test.html',
			data: function() {
			  return {
			  	content: '我是来自模板test.html中的内容'
			  }
			}
		}
		utils.asyncComponent(options, resolve, reject); 
	}

})(RongIM, {
    jQuery : jQuery
}, RongIM.components);
