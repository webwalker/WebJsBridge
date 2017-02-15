package com.ymt.framework.hybrid.model;

/**
 * Created by xujian on 2015/12/8.
 */
public enum InvokeStatus {
    Unknown(0, "Unknown", 0),

    Success(1, "Success", 0),

    Fail(2, "Fail", 0),

    Complete(3, "Complete", 0),

    Cancel(4, "Cancel", 0);

    private final int code;
    private final String message;

    InvokeStatus(int code, String message, int icon) {
        this.code = code;
        this.message = message;
    }

    public static InvokeStatus getByCode(int code) {
        for (InvokeStatus resultCode : InvokeStatus.values()) {
            if (resultCode.getCode() == code) {
                return resultCode;
            }
        }
        return null;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getMessage(String handlerName) {
        return handlerName + ":" + message;
    }
}
