package com.ymt.framework.hybrid;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Build;
import android.util.AttributeSet;
import android.webkit.WebView;

import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.defines.IWebViewJavascriptBridge;
import com.ymt.framework.hybrid.handler.HandlerMgr;

@SuppressLint("SetJavaScriptEnabled")
public class BridgeWebView extends WebView implements IWebViewJavascriptBridge {
    private final String TAG = "BridgeWebView";
    public static final String toLoadJs = "WebViewJavascriptBridge.js";

    private HandlerMgr handlerMgr = new HandlerMgr();

    public BridgeWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public BridgeWebView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init();
    }

    public BridgeWebView(Context context) {
        super(context);
        init();
    }

    private void init() {
        handlerMgr.setWebView(this);
        this.setVerticalScrollBarEnabled(false);
        this.setHorizontalScrollBarEnabled(false);
        this.getSettings().setJavaScriptEnabled(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }
        this.setWebViewClient(new BridgeWebViewClient(handlerMgr));
    }

    @Override
    public void sendEvent(String event) {
        handlerMgr.sendEvent(event);
    }

    @Override
    public void send(String data) {
        handlerMgr.send(data);
    }

    @Override
    public void send(String data, IJsCallBack responseCallback) {
        handlerMgr.send(data, responseCallback);
    }

    @Override
    public void callHandler(String name, String data, IJsCallBack callBack) {
        handlerMgr.callHandler(name, data, callBack);
    }
}
