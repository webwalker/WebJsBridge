package com.ymt.framework.hybrid.handler;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.model.BridgeEnum;

import java.util.HashMap;
import java.util.Map;

/**
 * manage Handler
 * Created by xujian on 2015/12/4.
 */
public class HandlerBuilder {
    static Map<String, AbstractBridgeHandler> handlers = new HashMap<String, AbstractBridgeHandler>();

    static {
        handlers.clear();
        build();
    }

    // mapping method handler
    public static Map<String, AbstractBridgeHandler> build() {
        for (BridgeEnum bridge : BridgeEnum.values()) {
            regist(bridge.getName(), bridge.getHandler());
        }
        return handlers;
    }

    /**
     * register handler,so that javascript can call it
     *
     * @param name
     * @param handler
     */
    public static void regist(String name, AbstractBridgeHandler handler) {
        if (handler != null) handlers.put(name, handler);
    }

    // get method handler
    public static AbstractBridgeHandler get(String name) {
        return handlers.get(name);
    }
}
