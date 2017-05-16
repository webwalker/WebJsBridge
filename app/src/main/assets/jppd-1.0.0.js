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
    var ppd = window.ppd = {
        initCallback: initCallback,
        registerHandler: registerHandler,
        config: config,
        ready: ready,
        test: test,
        //基础接口
        closeWin: closeWin,
        openWin: openWin,
        titleBar: titleBar,
        bottomBar: bottomBar,
        pageRefreshType: pageRefreshType,
        attach: attach,
        //用户接口
        userLogin: userLogin,
        getLoginStatus: getLoginStatus,
        getUserInfo: getUserInfo,
        uploadUserIcon: uploadUserIcon,
        interestMap: interestMap,
        //图像接口
        chooseImage: chooseImage,
        uploadImage: uploadImage,
        //支付接口
        pay: pay,
        order: order,
        orderPackage: orderPackage,
        notifyPay: notifyPay,
        orderDetail: orderDetail,
        withdraw: withdraw,
        //分享接口
        share: share,
        //评论接口
        comment: comment,
        replyComment: replyComment,
        //日记接口
        noteDetail: noteDetail,
        publishNote: publishNote,
        noteFansList: noteFansList,
        activityPartnerList: activityPartnerList,
        noteBrand: noteBrand,
        noteType: noteType,
        countryList: countryList,
        fansUserList: fansUserList,
        followUserList: followUserList,
        //消息接口
        showMsgIcon: showMsgIcon,
        onlineService: onlineService,
        openChat: openChat,
        //业务接口
        liveDetail: liveDetail,
        productDetail: productDetail,
        tabHome: tabHome,
        feedBack: feedBack,
        contactBook: contactBook,
        bindMobile: bindMobile,
        couponProducts: couponProducts,
        similarProduct: similarProduct,
        similarTopic: similarTopic,
        search: search,
        promotionProduct: promotionProduct,
        topicDetail: topicDetail,
        topicList: topicList,
        //事件接口
        listenPageEvent: listenPageEvent,
        notifyEvent: notifyEvent,
        //系统接口
        getDeviceInfo: getDeviceInfo,
        callPhone: callPhone,
        screenShot: screenShot,
        getNetworkType: getNetworkType,
        clipboard: clipboard,
        //监控接口
        sendUmengLog: sendUmengLog,
        sendYLog: sendYLog,
	    command: command,
	    registEvent: registEvent,
	    scrollEvent: scrollEvent
    };

    readyCallback._que = []; // manage ready callback event

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

    //无通用回调
    function execute(method, data){
        if(!isValid()) return;
        window.WebViewJavascriptBridge.callHandler(method, data);
    }

    //配置化完成后，执行Ready设置的回调(如果ready没有执行过)
    function config(data){
        configData = data;
        registBridge();
    }

    // 调用底层方法，在底层完成config状态检测，执行回调(如果config没有执行过)
    function ready(callback){
        if (initialize) callback();
        else readyCallback._que.push(callback);
    }

    function initCallback(){
        prepare(function(){
            WebViewJavascriptBridge.debug = configData.debug;
            initialize = true;
            configIsValid = true;
            readyCallback();
            /*
            execute('config', configData, function(result){
                if(result.code == 1) {
                    configIsValid = true;
                    readyCallback();
                }
            });*/
            //set as a default js message handler
            window.WebViewJavascriptBridge.init(function(message, responseCallback) {
            });
        });
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
        if(domain.indexOf("ymatou.com") == -1) {
            //alert("对不起，你没有调用权限，请联系管理员.");
            //return false;
        }
        return ret;
    }

    // 注册方法，让Native层调用
    function registerHandler(handlerName, handler) {
        window.WebViewJavascriptBridge.registerHandler(handlerName, handler);
    }

    function test(data) { execute('test', data); }

    function closeWin() { execute('closeWin', ""); }

    function openWin(data) { execute('openWin', data); }

    function titleBar(data) { execute('titleBar', data); }

    function bottomBar(data) { execute('bottomBar', data); }

    function pageRefreshType(data) { execute('pageRefreshType', data); }

    function attach(data) { execute('attach', data); }

    function userLogin() { execute('userLogin', ''); }

    function getLoginStatus(data) { execute('getLoginStatus', data); }

    function getUserInfo(data) { execute('getUserInfo', data); }

    function uploadUserIcon(data) { execute('uploadUserIcon', data); }

    function interestMap() { execute('interestMap', ''); }

    function chooseImage(data) { execute('chooseImage', data); }

    function uploadImage(data) { execute('uploadImage', data); }

    function pay(data) { execute('pay', data); }

    function order(data) { execute('order', data); }

    function orderDetail(data) { execute('orderDetail', data); }

    function orderPackage(data) { execute('orderPackage', data); }

    function withdraw() { execute('withdraw', ''); }

    function notifyPay(data) { execute('notifyPay', data); }

    function share(data) { execute('share', data); }

    function comment(data) { execute('comment', data); }

    function replyComment(data) { execute('replyComment', data); }

    function noteDetail(data) { execute('noteDetail', data); }

    function publishNote(data) { execute('publishNote', data); }

    function noteFansList(data) { execute('noteFansList', data); }

    function activityPartnerList(data) { execute('activityPartnerList', data); }

    function noteBrand() { execute('noteBrand', ''); }

    function noteType(data) { execute('noteType', data); }

    function countryList() { execute('countryList', ''); }

    function followUserList(data) { execute('followUserList', data); }

    function fansUserList(data) { execute('fansUserList', data); }

    function showMsgIcon() { execute('showMsgIcon', ''); }

    function onlineService() { execute('onlineService', ''); }

    function openChat(data) { execute('openChat', data); }

    function liveDetail(data) { execute('liveDetail', data); }

    function productDetail(data) { execute('productDetail', data); }

    function tabHome(data) { execute('tabHome', data); }

    function feedBack() { execute('feedBack', ''); }

    function contactBook() { execute('contactBook', ''); }

    function bindMobile(data) { execute('bindMobile', data); }

    function couponProducts(data) { execute('couponProducts', data); }

    function similarProduct(data) { execute('similarProduct', data); }

    function similarTopic(data) { execute('similarTopic', data); }

    function search(data) { execute('search', data); }

    function promotionProduct(data) { execute('promotionProduct', data); }

    function topicList(data) { execute('topicList', data); }

    function topicDetail(data) { execute('topicDetail', data); }

    function listenPageEvent(data) { execute('listenPageEvent', data); }

    function notifyEvent(data) { execute('notifyEvent', data); }

    function getDeviceInfo(data) { execute('getDeviceInfo', data); }

    function callPhone(data) { execute('callPhone', data); }

    function screenShot(data) { execute('screenShot', data); }

    function getNetworkType(data) { execute('getNetworkType', data); }

    function clipboard(data) { execute('clipboard', data); }

    function sendUmengLog(data) { execute('sendUmengLog', data); }

    function sendYLog(data) { execute('sendYLog', data); }

    function registEvent(data) { execute('registEvent', data); }

    function scrollEvent(data) { execute('scrollEvent', data); }

    function command(name, data) { execute(name, data); }
})();