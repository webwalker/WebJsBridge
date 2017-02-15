package com.ymt.framework.hybrid.model;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.handler.ConfigHandler;
import com.ymt.framework.hybrid.handler.DefaultHandler;
import com.ymt.framework.hybrid.handler.NullHandler;
import com.ymt.framework.hybrid.handler.ReadyHandler;
import com.ymt.framework.hybrid.handler.SubmitFromHandler;
import com.ymt.framework.hybrid.handler.TestHandler;

/**
 * used to define bridge module type
 * Created by xujian on 2016/1/28.
 */
public enum BridgeEnum {
    Null("", 10000, new NullHandler()),

    Config("config", 10001, new ConfigHandler()),

    Ready("ready", 10002, new ReadyHandler()),

    SubmitFromWeb("submitFromWeb", 10003, new SubmitFromHandler()),

    Test("test", 10004, new TestHandler());

    private final String name;
    private final int type;
    private final AbstractBridgeHandler handler;

    BridgeEnum(String name, int type, AbstractBridgeHandler handler) {
        this.name = name;
        this.type = type;
        this.handler = handler;
    }

    public static BridgeEnum getByName(String name) {
        for (BridgeEnum bridge : BridgeEnum.values()) {
            if (bridge.getName().equals(name)) {
                return bridge;
            }
        }
        return BridgeEnum.Null;
    }

    public static BridgeEnum getByType(int type) {
        for (BridgeEnum bridge : BridgeEnum.values()) {
            if (bridge.getType() == type) {
                return bridge;
            }
        }
        return BridgeEnum.Null;
    }

    public String getName() {
        return name;
    }

    public int getType() {
        return type;
    }

    public AbstractBridgeHandler getHandler() {
        return handler;
    }
}
