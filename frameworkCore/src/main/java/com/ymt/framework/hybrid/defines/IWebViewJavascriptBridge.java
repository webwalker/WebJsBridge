package com.ymt.framework.hybrid.defines;

public interface IWebViewJavascriptBridge {
    public void sendEvent(String event);

    public void send(String data);

    public void send(String data, IJsCallBack responseCallback);

    public void callHandler(String name, String data, IJsCallBack callBack);
}
