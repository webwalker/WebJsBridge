package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JNotifyPay {
    private String orderId;
    private int payType;
    private int payStatus;
    private String payMessage;

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public void setPayType(int payType) {
        this.payType = payType;
    }

    public void setPayStatus(int payStatus) {
        this.payStatus = payStatus;
    }

    public void setPayMessage(String payMessage) {
        this.payMessage = payMessage;
    }

    public String getOrderId() {
        return orderId;
    }

    public int getPayType() {
        return payType;
    }

    public int getPayStatus() {
        return payStatus;
    }

    public String getPayMessage() {
        return payMessage;
    }
}
