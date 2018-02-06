//add by xujian
(function() {
    var initialize = false;
    var configData;
    var configIsValid = false;
    var readyCallback = function () {
        var callback = readyCallback._que.shift();
        while (callback) {
            if (typeof callback === 'function') callback();
            callback = readyCallback._que.shift();
        }
    };
    readyCallback._que = []; // manage ready callback event

    var ppd = window.ppd = {
        config: config,
        initCallback: initCallback,
        ready: ready,
        openWin: openWin,
        call: call,
        registerHandler: registerHandler,
    };

    //配置化完成后，执行Ready设置的回调(如果ready没有执行过)
    function config(data){
        configData = data;
        registBridge();
    }

    function registBridge(){
        var iframe = document.getElementById("initIframe");
        if(iframe) {
            initCallback();
            return true;
        }
        iframe = document.createElement('iframe');
        iframe.id = "initIframe";
        iframe.style.display = 'none';
        iframe.src = 'ppdapi://init/';
        document.documentElement.appendChild(iframe);
        return false;
    }

    function initCallback(){
        prepare(function(){
            WebViewJavascriptBridge.debug = configData.debug;
            initialize = true;
            configIsValid = true;
            readyCallback();
            //set as a default js message handler
            window.WebViewJavascriptBridge.init(function(message, responseCallback) {
            });
        });
    }

    // wait for bridge object injected
    function prepare(callback){
        if (window.WebViewJavascriptBridge) {
            callback();
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady',
            function() {
                callback();
            }, false);
        }
    }

    // 调用底层方法，在底层完成config状态检测，执行回调(如果config没有执行过)
    function ready(callback){
        if (initialize) callback();
        else readyCallback._que.push(callback);
    }

    function call(id) { execute(id, ''); }

    function call(id, data) { execute(id, data); }

    function openWin(data) { execute('openWin', data); }

    // 注册方法，让Native调用
    function registerHandler(handlerName, handler) {
        window.WebViewJavascriptBridge.registerHandler(handlerName, handler);
    }

    //无通用回调
    function execute(method, data){
        if(!isValid()) return;
        window.WebViewJavascriptBridge.callHandler(method, data);
    }

    // check the valid invoke status, when any api method invoked
    function isValid(){
        var ret = true;
        if(!initialize) ret = false;
        if(!configIsValid) ret = false;

        if(!ret) {
            alert("bridge module hasn't been initialized.");
            return ret;
        }
        var domain = window.location.host;
        if(domain.indexOf("ppdai.com") == -1) {
            //alert("对不起，你没有调用权限，请联系管理员.");
            //return false;
        }
        return ret;
    }
})();

ppd.config({
  debug: false,
  appId: '',
  timestamp: '',
  nonceStr: '',
  signature: '',
  jsApiList: []
});
