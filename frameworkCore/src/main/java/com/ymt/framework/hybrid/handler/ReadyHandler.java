package com.ymt.framework.hybrid.handler;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.defines.IJsCallBack;

/**
 * Created by xujian on 2015/12/4.
 */
public class ReadyHandler extends AbstractBridgeHandler {
    @Override
    public void handler(String json, IJsCallBack resp) {
        buildParams(resp);
    }

    @Override
    public void callback(Object data) {
    }
}
