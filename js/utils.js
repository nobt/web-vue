/* 
* author: lilin
* time: 2019-2-27
*/
'use strict';

(function (RongIM, dependencies) {
    /**
    *
    *  Base64 encode / decode
    *
    **/
    var Base64 = {

        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

        // public method for encoding
        , encode: function (input)
        {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length)
            {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2))
                {
                    enc3 = enc4 = 64;
                }
                else if (isNaN(chr3))
                {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            } // Whend 

            return output;
        } // End Function encode 


        // public method for decoding
        ,decode: function (input)
        {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length)
            {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64)
                {
                    output = output + String.fromCharCode(chr2);
                }

                if (enc4 != 64)
                {
                    output = output + String.fromCharCode(chr3);
                }

            } // Whend 

            output = Base64._utf8_decode(output);

            return output;
        } // End Function decode 


        // private method for UTF-8 encoding
        ,_utf8_encode: function (string)
        {
            var utftext = "";
            string = string.replace(/\r\n/g, "\n");

            for (var n = 0; n < string.length; n++)
            {
                var c = string.charCodeAt(n);

                if (c < 128)
                {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048))
                {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else
                {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            } // Next n 

            return utftext;
        } // End Function _utf8_encode 

        // private method for UTF-8 decoding
        ,_utf8_decode: function (utftext)
        {
            var string = "";
            var i = 0;
            var c, c1, c2, c3;
            c = c1 = c2 = 0;

            while (i < utftext.length)
            {
                c = utftext.charCodeAt(i);

                if (c < 128)
                {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224))
                {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else
                {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            } // Whend 

            return string;
        } // End Function _utf8_decode 

    }
    /*
    * 时间扩展
    */
    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
    /*
    * 格式化时间
    */
    function formatTimeToStr(times, pattern) {
        var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
        if (pattern) {
            d = new Date(times).Format(pattern);
        }
        return d.toLocaleString();
    } 
    /*
    * 获取格式时间
    */
    function getFormatTime(time) {
      if(time != null && time != ""){
        var date = new Date(time);
        return formatTimeToStr(date, "yyyy-MM-dd");
      }else{
        return "";
      }
    }         
    /*
    * cookie
    */
    var cookie = {
        _setCookie: function(name, value) {
          var t = new Date();
          t.setTime(t.getTime() + 1 * 1 * 3600 * 1000);
          document.cookie = escape(name) + "=" + escape(value) + ";path=/;expires=" + t.toGMTString();
        },
        setCookie: function(name, value) {
          if(typeof(value) === 'object'){
            value = JSON.stringify(value);
          }
          var c = String.fromCharCode(value.charCodeAt(0) + value.length);
          for (var i = 1; i < value.length; i++) {
            c += String.fromCharCode(value.charCodeAt(i) + value.charCodeAt(i - 1));
          }
          this._setCookie(name, escape(c));
        },
        _getCookie: function(name) {
          if (new RegExp("\\b" + name + "=([^;]+)", "g").test(document.cookie)) return unescape(RegExp.$1 || '');
          return '';
        },
        getCookie: function(name) {
          var code = unescape(this._getCookie(name));
          var c = String.fromCharCode(code.charCodeAt(0) - code.length);
          for (var i = 1; i < code.length; i++) {
            c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
          }
          return c;
        }
    };
    /*
    * 加载文件
    */
    function loadTemplate(template) {
        var version = RongIM.config.version;
        var promise;
        var pathRegex = new RegExp(/^([a-z_\-\s0-9\.\/]+)+\.html$/);
        var isTemplateUrl = pathRegex.test(template);
        if(isTemplateUrl){
            promise = $.get(template + '?v=' + version);
        } else {
            var html = $(template).html();
            promise = $.Deferred().resolve(html).promise();
        }
        return promise;
    }

    /*
    * 处理加载模板
    */
    function asyncComponent(options, resolve, reject) {
        var promise;
        var pathRegex = new RegExp(/^([a-z_\-\s0-9\.\/]+)+\.html$/);
        var isTemplateUrl = pathRegex.test(options.template);
        if(isTemplateUrl){
            promise = $.get(options.template);
        } else {
            var html = $(options.template).html();
            promise = $.Deferred().resolve(html).promise();
        }
        promise.then(function (html) {
            options.mixins = options.mixins || [];
            var component = $.extend({}, options, {template: html});
            resolve(component);
        }).fail(function (xhr, status, error) {
            reject(error);
        });
    }
    var Http = {};
    /*
    * get请求
    */
    Http.get = function (url, params, callback) {
        requestAjax(url, 'get', params, callback);
    }
    /*
    * post请求
    */
    Http.post = function (url, params, callback) {
        requestAjax(url, 'post', params, callback);
    }
    /*
    * 请求方法
    */
    function requestAjax(url, method, data, callback) {
        var params = data;
        $.ajax({
          'type': method,
          'url': url,
          'data': params,
          'async': true,
          'dataType': 'json',
          'timeout': 1000 * 120,
          'beforeSend': function () {
            
          },
          'success': function (response) {
            if(response.code == 200){
              callback(null, response.data);
            }else{
              callback(response);
            }
          },
          'error': function (error) {
            var msg = '网络异常，请稍候重试!';
            layer.msg(msg);
            callback({code: 404, msg: msg});
          },
          'complete': function () {
            
          }
        });
    }   
    /*
    * localStorage 存储
    */
    var storage = {
        setItem: function(name, value) {
          if(typeof(value) === 'object'){
            value = JSON.stringify(value);
          }

          localStorage.setItem(name, Base64.encode(value));
        },
        getItem: function(name) {
          var c = localStorage.getItem(name) ? Base64.decode(localStorage.getItem(name)) : localStorage.getItem(name);
          return c;
        },
        removeItem: function(name){
          localStorage.removeItem(name);
        }
    };
    /*
    * 关闭当前窗口
    */
    function closeWin(){  
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {  
            window.location.href="about:blank";  
            window.close();  
        } else {  
            window.opener = null;  
            window.open("", "_self");  
            window.close();  
        }  
    } 


    RongIM.utils = {
        Http: Http,
        loadTemplate: loadTemplate,
        asyncComponent: asyncComponent,
        cookie: cookie,
        formatTimeToStr: formatTimeToStr,
        storage: storage,
        closeWin: closeWin
    };

})(RongIM, {
    jQuery: jQuery
});
