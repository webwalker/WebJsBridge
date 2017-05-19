package com.ymt.framework.hybrid.model;

import com.ymt.framework.hybrid.defines.AbstractBridgeHandler;
import com.ymt.framework.hybrid.handler.ConfigHandler;
import com.ymt.framework.hybrid.handler.NullHandler;
import com.ymt.framework.hybrid.handler.ReadyHandler;
import com.ymt.framework.hybrid.handler.SubmitFromHandler;
import com.ymt.framework.hybrid.handler.TestHandler;

/**
 * used to define bridge module type
 * <p>
 * //Name编码规则:xxaabbbb
 * xx为识别一个App
 * aa表示业务模块，业务类型
 * bbbb表示业务模块内bridge接口编号
 * Created by xujian on 2016/1/28.
 */
public enum BridgeEnum {
    Null("10000000", new NullHandler()),

    Config("10000001", new ConfigHandler()),

    Ready("10000002", new ReadyHandler()),

    SubmitFromWeb("10000003", new SubmitFromHandler()),

    Test("10000004", new TestHandler());

    private final String name;
    private final AbstractBridgeHandler handler;

    BridgeEnum(String name, AbstractBridgeHandler handler) {
        this.name = name;
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

    public String getName() {
        return name;
    }

    public AbstractBridgeHandler getHandler() {
        return handler;
    }
}
