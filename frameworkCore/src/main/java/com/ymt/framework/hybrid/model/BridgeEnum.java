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
 * Name规则:xxaabbbb
 * xx为识别一个App
 * aa表示业务模块，业务类型
 * bbbb表示业务模块内bridge接口编号
 * Created by xujian on 2016/1/28.
 */
public enum BridgeEnum {
    Default(10000000, new NullHandler()),

    Config(10000001, new ConfigHandler()),

    Ready(10000002, new ReadyHandler()),

    SubmitFromWeb(10000003, new SubmitFromHandler()),

    Test(10000004, new TestHandler());

    private int name;
    private final AbstractBridgeHandler handler;

    BridgeEnum(int name, AbstractBridgeHandler handler) {
        this.name = name;
        this.handler = handler;
    }

    public static BridgeEnum getById(String id) {
        for (BridgeEnum bridge : BridgeEnum.values()) {
            if (bridge.getNames().equals(id)) {
                return bridge;
            }
        }
        return BridgeEnum.Default;
    }

    public static BridgeEnum getById(int id) {
        for (BridgeEnum bridge : BridgeEnum.values()) {
            if (bridge.getName() == id) {
                return bridge;
            }
        }
        return BridgeEnum.Default;
    }

    public int getName() {
        return name;
    }

    public AbstractBridgeHandler getHandler() {
        return handler;
    }

    public String getNames() {
        return getName() + "";
    }
}
