package com.ymt.framework.hybrid.model;

/**
 * Created by xujian on 2015/11/6.
 */
public class WebBusItem {
    public int msgType;
    public Object msgData;

    public WebBusItem() {
    }

    public WebBusItem(int msgType, Object msgData) {
        this.msgType = msgType;
        this.msgData = msgData;
    }
}
