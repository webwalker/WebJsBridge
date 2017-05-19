package com.ymt.framework.hybrid.handler;

import android.os.Handler;
import android.os.Message;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.model.BridgeEnum;
import com.ymt.framework.hybrid.model.resp.TestResultItem;

/**
 * Created by xujian on 2015/12/7.
 */
public class TestHandler<T> extends AbstractBridgeHandler {
    @Override
    public void handler(String json, IJsCallBack resp) {
        buildParams(resp);

        // 做Native类型任务
        final TestResultItem resultItem = new TestResultItem("xiaoming, This is a test!");

        new Handler() {
            @Override
            public void handleMessage(Message msg) {
                sendMsg(BridgeEnum.Test.getName(), resultItem);
            }
        }.sendEmptyMessageDelayed(0, 2000);
    }

    @Override
    public void callback(Object data) {
        response(SUCCESS, "success", data);
    }
}
