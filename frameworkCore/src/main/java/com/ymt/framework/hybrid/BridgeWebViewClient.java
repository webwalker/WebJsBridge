package com.ymt.framework.hybrid;

import android.graphics.Bitmap;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.ymt.framework.hybrid.handler.HandlerMgr;
import com.ymt.framework.hybrid.manager.BridgeUtil;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

/**
 * Created by bruce on 10/28/15.
 */
public class BridgeWebViewClient extends WebViewClient {
    private BridgeWebView webView;
    private HandlerMgr handlerMgr;

    public BridgeWebViewClient(HandlerMgr handlerMgr) {
        this.handlerMgr = handlerMgr;
        this.webView = handlerMgr.getWebView();
    }

    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        if (isBridgeInvoke(view, url)) return true;
        return super.shouldOverrideUrlLoading(view, url);
    }

    //check whether jsbridge invokes protocal or not
    private boolean isBridgeInvoke(WebView view, String url) {
        try {
            url = URLDecoder.decode(url, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        if (url.startsWith(BridgeUtil.YMT_INIT)) { // regist Bridge
            handlerMgr.onPageFinished(view);
            return true;
        } else if (url.startsWith(BridgeUtil.YY_RETURN_DATA)) { // return data
            handlerMgr.handlerReturnData(url);
            return true;
        } else if (url.startsWith(BridgeUtil.YY_OVERRIDE_SCHEMA)) {
            handlerMgr.flushMessageQueue(view);
            return true;
        }
        return false;
    }

    @Override
    public void onPageStarted(WebView view, String url, Bitmap favicon) {
        super.onPageStarted(view, url, favicon);
    }

    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);

        if (BridgeWebView.toLoadJs != null) {
            BridgeUtil.webViewLoadLocalJs(view, BridgeWebView.toLoadJs);
        }

        handlerMgr.onPageFinished(url);
    }

    @Override
    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
        super.onReceivedError(view, errorCode, description, failingUrl);
    }
}