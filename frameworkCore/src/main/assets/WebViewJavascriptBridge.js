//notation: js file can only use this kind of comments
//since comments will cause error when use in webview.loadurl,
//comments will be remove by java use regexp
// xujian：注释不可以写在行代码后
(function() {
    if (window.WebViewJavascriptBridge) {
        return;
    }
    var messagingIframe;
    var sendMessageQueue = [];
    var receiveMessageQueue = [];
    var messageHandlers = {};
    var CUSTOM_PROTOCOL_SCHEME = 'ymtapi';
    var QUEUE_HAS_MESSAGE = '__QUEUE_MESSAGE__/';
    var responseCallbacks = {};
    var uniqueId = 1;

    function _createQueueReadyIframe(doc) {
        messagingIframe = doc.createElement('iframe');
        messagingIframe.id = "bridgeIframe";
        messagingIframe.style.display = 'none';
        doc.documentElement.appendChild(messagingIframe);
    }

    function isAndroid() {
        var ua = navigator.userAgent.toLowerCase();
        var isA = ua.indexOf("android") > -1;
        if (isA) {
            return true;
        }
        return false;
    }

    function isIphone() {
        var ua = navigator.userAgent.toLowerCase();
        var isIph = ua.indexOf("iphone") > -1;
        if (isIph) {
            return true;
        }
        return false;
    }

    //在初始化完成之前如果有事件调用，则放入队列中待初始化完成后执行
    function init(messageHandler) {
        if (WebViewJavascriptBridge._messageHandler) {
            throw new Error('WebViewJavascriptBridge.init called twice');
        }
        WebViewJavascriptBridge._messageHandler = messageHandler;
        var receivedMessages = receiveMessageQueue;
        receiveMessageQueue = null;
        for (var i = 0; i < receivedMessages.length; i++) {
            _dispatchMessageFromNative(receivedMessages[i]);
        }
    }

    function send(data, responseCallback) {
        _doSend({
            data: data
        }, responseCallback);
    }

    function registerHandler(handlerName, handler) {
        messageHandlers[handlerName] = handler;
    }

    function callHandler(handlerName, data, responseCallback) {
        _doSend({
            handlerName: handlerName,
            data: data
        }, responseCallback);
    }

    // without common callback via xujian
    function callHandler2(handlerName, data) {
        _doSend2({handlerName: handlerName, data: data});
    }

    //sendMessage add message, 触发native处理 sendMessage
    function _doSend(message, responseCallback) {
        if (responseCallback) {
            var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
            responseCallbacks[callbackId] = responseCallback;
            message.callbackId = callbackId;
        }

        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    }

    // without common callback via xujian
    function _doSend2(message) {
        handleNativeCallback(message);
        sendMessageQueue.push(message);
        messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE;
    }

    //via xujian
    function handleNativeCallback(msg){
        // 定义一个虚拟回调用于分发不同的回调方法：success、fail等
        var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
        responseCallbacks[callbackId] = function(result){
            //var result = JSON.parse(data);
            if(!result || !result.code){
                alert("handle native callback exception.");
                return;
            }
            var callback = msg.data;
            switch(result.code){
                case 1: if(isDefined(callback.success)) callback.success(result);
                        if(isDefined(callback.complete)) callback.complete(result);
                    break;
                case 2: if(isDefined(callback.fail)) callback.fail(result);
                        if(isDefined(callback.complete)) callback.complete(result);
                    break;
                case 3: if(isDefined(callback.complete)) callback.complete(result);
                    break;
                case 4: if(isDefined(callback.cancel)) callback.cancel(result);
                    break;
                default: if(isDefined(callback.complete)) callback.complete(result);
                    break;
            }
        };
        msg.callbackId = callbackId;
    }

    function isDefined(data){
        if(data == null || typeof data == 'undefined') return false;
        return true;
    }

    // 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url shouldOverrideUrlLoading 的方式返回内容
    function _fetchQueue() {
        var messageQueueString = JSON.stringify(sendMessageQueue);
        sendMessageQueue = [];
        //add by hq
        if (isIphone()) {
            return messageQueueString;
            //android can't read directly the return data, so we can reload iframe src to communicate with java
        } else if (isAndroid()) {
            messagingIframe.src = CUSTOM_PROTOCOL_SCHEME + '://return/_fetchQueue/' + encodeURIComponent(messageQueueString);
        }
    }

    //提供给native使用,
    function _dispatchMessageFromNative(messageJSON) {
        setTimeout(function() {
            var message = JSON.parse(messageJSON);
            var responseCallback;

            if(WebViewJavascriptBridge.debug == true) {
                alert(messageJSON);
            }
            //java call finished, now need to call js callback function
            if (message.responseId) {
                responseCallback = responseCallbacks[message.responseId];
                if (!responseCallback) {
                    return;
                }
                responseCallback(JSON.parse(message.responseData));
                delete responseCallbacks[message.responseId];
            } else {
                //Native Incoke JS，直接发送
                if (message.callbackId) {
                    var callbackResponseId = message.callbackId;
                    responseCallback = function(responseData) {
                        _doSend({
                            responseId: callbackResponseId,
                            responseData: responseData
                        });
                    };
                }

                var handler = WebViewJavascriptBridge._messageHandler;
                if (message.handlerName) {
                    handler = messageHandlers[message.handlerName];
                }
                //查找指定handler
                try {
                    if(message.event){
                        eval(message.event);
                        return;
                    }
                    handler(message.data, responseCallback);
                } catch (exception) {
                    if (typeof console != 'undefined') {
                        console.log("WebViewJavascriptBridge: WARNING: javascript handler threw.", message, exception);
                    }
                }
            }
        });
    }

    //提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
    function _handleMessageFromNative(messageJSON) {
        //console.log(messageJSON);
        if (receiveMessageQueue && receiveMessageQueue.length > 0) {
            receiveMessageQueue.push(messageJSON);
        } else {
            _dispatchMessageFromNative(messageJSON);
        }
    }

    function getVersion() {
        return 1003;
    }

    var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
        debug: false,
        init: init,
        send: send,
        registerHandler: registerHandler,
        callHandler: callHandler,
        callHandler2: callHandler2,
        _fetchQueue: _fetchQueue,
        _handleMessageFromNative: _handleMessageFromNative,
        getVersion: getVersion
    };

    var doc = document;
    _createQueueReadyIframe(doc);
    var readyEvent = doc.createEvent('Events');
    readyEvent.initEvent('WebViewJavascriptBridgeReady');
    readyEvent.bridge = WebViewJavascriptBridge;
    doc.dispatchEvent(readyEvent);
    try{ymt.initCallback();}catch(e){}
    try{YmtApi.sendEvent(1000, {}, '');}catch(e){}
})();