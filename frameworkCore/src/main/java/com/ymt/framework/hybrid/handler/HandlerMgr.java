package com.ymt.framework.hybrid.handler;

import android.os.Looper;
import android.os.SystemClock;
import android.text.TextUtils;
import android.webkit.WebView;

import com.ymt.framework.hybrid.BridgeWebView;
import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.defines.IWebViewJavascriptBridge;
import com.ymt.framework.hybrid.manager.BridgeUtil;
import com.ymt.framework.hybrid.model.Message;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * handler manager util
 * Created by xujian on 2015/12/4.
 */
public class HandlerMgr implements IWebViewJavascriptBridge {
    BridgeWebView webView;
    private long uniqueId = 0;
    private List<Message> startupMessage = new ArrayList<Message>();
    AbstractBridgeHandler defaultHandler = new DefaultHandler();
    Map<String, IJsCallBack> responseCallbacks = new HashMap<String, IJsCallBack>();

    public void setWebView(BridgeWebView wv) {
        this.webView = wv;
    }

    public void handlerReturnData(String url) {
        String functionName = BridgeUtil.getFunctionFromReturnUrl(url);
        IJsCallBack f = responseCallbacks.get(functionName);
        String data = BridgeUtil.getDataFromReturnUrl(url);
        if (f != null) {
            f.onCallBack(data);
            responseCallbacks.remove(functionName);
            return;
        }
    }

    public void regist(String callbackStr, IJsCallBack callBack) {
        responseCallbacks.put(callbackStr, callBack);
    }

    public IJsCallBack get(String responseId) {
        return responseCallbacks.get(responseId);
    }

    public void remove(String responseId) {
        responseCallbacks.remove(responseId);
    }

    /**
     * @param handler default handler,handle messages send by js without assigned handler name,
     *                if js message has handler name, it will be handled by named handlers registered by native
     */
    public void setDefaultHandler(AbstractBridgeHandler handler) {
        this.defaultHandler = handler;
    }

    //call javascript registered handler
    public void callHandler(String handlerName, String data, IJsCallBack callBack) {
        doSend(handlerName, data, callBack);
    }

    public void send(String data) {
        send(data, null);
    }

    public void send(String data, IJsCallBack responseCallback) {
        doSend(null, data, responseCallback);
    }

    private void doSend(String handlerName, String data, IJsCallBack responseCallback) {
        Message m = new Message();
        if (!TextUtils.isEmpty(data)) {
            m.setData(data);
        }
        if (responseCallback != null) {
            String callbackStr = String.format(BridgeUtil.CALLBACK_ID_FORMAT, ++uniqueId + (BridgeUtil.UNDERLINE_STR + SystemClock.currentThreadTimeMillis()));
            regist(callbackStr, responseCallback);
            m.setCallbackId(callbackStr);
        }
        if (!TextUtils.isEmpty(handlerName)) {
            m.setHandlerName(handlerName);
        }
        queueMessage(m);
    }

    public void dispatchMessage(Message m) {
        String messageJson = m.toJson();
        //escape special characters for json string
        messageJson = messageJson.replaceAll("(\\\\)([^utrn])", "\\\\\\\\$1$2");
        messageJson = messageJson.replaceAll("(?<=[^\\\\])(\")", "\\\\\"");
        String javascriptCommand = String.format(BridgeUtil.JS_HANDLE_MESSAGE_FROM_JAVA, messageJson);
        if (Thread.currentThread() == Looper.getMainLooper().getThread()) {
            webView.loadUrl(javascriptCommand);
        }
    }

    private void queueMessage(Message m) {
        if (startupMessage != null) {
            startupMessage.add(m);
        } else {
            dispatchMessage(m);
        }
    }

    public void flushMessageQueue(final WebView wv) {
        if (Thread.currentThread() == Looper.getMainLooper().getThread()) {
            this.loadUrl(BridgeUtil.JS_FETCH_QUEUE_FROM_JAVA, new IJsCallBack() {

                @Override
                public void onCallBack(String data) {
                    // deserializeMessage
                    List<Message> list = null;
                    try {
                        list = Message.toArrayList(data);
                    } catch (Exception e) {
                        e.printStackTrace();
                        return;
                    }
                    if (list == null || list.size() == 0) {
                        return;
                    }
                    for (int i = 0; i < list.size(); i++) {
                        Message m = list.get(i);
                        String responseId = m.getResponseId();
                        // 是否是response
                        if (!TextUtils.isEmpty(responseId)) {
                            IJsCallBack function = get(responseId);
                            String responseData = m.getResponseData();
                            function.onCallBack(responseData);
                            remove(responseId);
                        } else {
                            IJsCallBack responseFunction = null;
                            // if had callbackId
                            final String callbackId = m.getCallbackId();
                            if (!TextUtils.isEmpty(callbackId)) {
                                responseFunction = new IJsCallBack() {
                                    @Override
                                    public void onCallBack(String data) {
                                        Message responseMsg = new Message();
                                        responseMsg.setResponseId(callbackId);
                                        responseMsg.setResponseData(data);
                                        queueMessage(responseMsg);
                                    }
                                };
                            } else {
                                responseFunction = new IJsCallBack() {
                                    @Override
                                    public void onCallBack(String data) {
                                        // do nothing
                                    }
                                };
                            }
                            AbstractBridgeHandler handler;
                            if (!TextUtils.isEmpty(m.getHandlerName())) {
                                handler = HandlerBuilder.get(m.getHandlerName());
                            } else {
                                handler = defaultHandler;
                            }
                            if (handler != null) {
                                handler.handler(m.getData(), responseFunction);
                            }
                        }
                    }
                }
            });
        }
    }

    public void loadUrl(String jsUrl, IJsCallBack returnCallback) {
        webView.loadUrl(jsUrl);
        regist(BridgeUtil.parseFunctionName(jsUrl), returnCallback);
    }

    public void onPageFinished(String url) {
        //
        if (startupMessage != null) {
            for (Message m : startupMessage) {
                dispatchMessage(m);
            }
            startupMessage = null;
        }
    }

    public List<Message> getStartupMessage() {
        return startupMessage;
    }

    public void setStartupMessage(List<Message> startupMessage) {
        this.startupMessage = startupMessage;
    }

    public BridgeWebView getWebView() {
        return webView;
    }


}
