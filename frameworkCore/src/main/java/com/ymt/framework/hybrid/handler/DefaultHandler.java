package com.ymt.framework.hybrid.handler;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.model.BridgeEnum;

public class DefaultHandler extends AbstractBridgeHandler {
    @Override
    public void handler(String json, IJsCallBack resp) {
        buildParams(resp);

        sendMsg(BridgeEnum.Config.getType());
    }

    @Override
    public void callback(Object data) {
        callback(SUCCESS, "success", "DefaultHandler response data");
    }
}