package com.ymt.framework.hybrid.defines;

import android.text.TextUtils;

import com.google.gson.Gson;
import com.ymt.framework.hybrid.model.WebBusItem;
import com.ymt.framework.hybrid.model.resp.ResponseItem;

import java.lang.reflect.Type;

import de.greenrobot.event.EventBus;

/**
 * Bridge Interactive handler
 */
public abstract class AbstractBridgeHandler {
    private static Gson gson = new Gson();
    private IJsCallBack js = null;

    public final static int SUCCESS = 1;
    public final static int FAIL = 2;
    public final static int COMPLETE = 3;
    public final static int CANCEL = 4;

    public abstract void handler(String json, IJsCallBack resp);

    public abstract void callback(Object data);

    protected void buildParams(IJsCallBack resp) {
        this.js = resp;
    }

    protected <T> T buildParams(String json, Type type, IJsCallBack resp) {
        this.js = resp;

        if (TextUtils.isEmpty(json))
            return null;
        return gson.fromJson(json, type);
    }

    public IJsCallBack getJs() {
        return js;
    }

    protected void response(int code) {
        response(code, "", null);
    }

    protected void response(int code, String msg) {
        response(code, msg, null);
    }

    protected void response(int code, String msg, Object data) {
        if (getJs() == null) return;
        getJs().onCallBack(getResp(code, msg, data));
    }

    protected void sendMsg(int type) {
        EventBus.getDefault().post(new WebBusItem(type, null));
    }

    protected void sendMsg(int type, Object data) {
        EventBus.getDefault().post(new WebBusItem(type, data));
    }

    protected String getResp(int code, String msg) {
        return getResp(code, msg, null);
    }

    protected String getResp(int code, String msg, Object data) {
        ResponseItem resp = new ResponseItem();
        resp.code = code;
        resp.msg = msg;
        resp.data = data;
        return gson.toJson(resp);
    }

    protected String getResp(ResponseItem resp) {
        return gson.toJson(resp);
    }
}

