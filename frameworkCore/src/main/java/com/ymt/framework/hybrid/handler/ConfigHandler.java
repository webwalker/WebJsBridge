package com.ymt.framework.hybrid.handler;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.model.BridgeEnum;
import com.ymt.framework.hybrid.model.JContext;
import com.ymt.framework.hybrid.model.params.JConfig;

/**
 * Created by xujian on 2015/12/4.
 */
public class ConfigHandler extends AbstractBridgeHandler {
    @Override
    public void handler(String json, IJsCallBack resp) {
        JConfig config = buildParams(json, JConfig.class, resp);
        JContext.getInstance().setConfig(config);

        sendMsg(BridgeEnum.Config.getName());
    }

    @Override
    public void callback(Object data) {
        response(SUCCESS);
    }
}
