package com.ymt.framework.hybrid.model;

/**
 * Created by xujian on 2015/11/6.
 */
public class WebBusItem {
    public int type;
    public Object data;

    public WebBusItem() {
    }

    public WebBusItem(int type, Object data) {
        this.type = type;
        this.data = data;
    }
}
