package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JChat {
    private int sessionId;
    private int toId;
    private String toLoginId;
    private String toLogoUrl;
    private int paramType;
    private Object param;

    public void setSessionId(int sessionId) {
        this.sessionId = sessionId;
    }

    public void setToId(int toId) {
        this.toId = toId;
    }

    public void setToLoginId(String toLoginId) {
        this.toLoginId = toLoginId;
    }

    public void setToLogoUrl(String toLogoUrl) {
        this.toLogoUrl = toLogoUrl;
    }

    public void setParamType(int paramType) {
        this.paramType = paramType;
    }

    public void setParam(Object param) {
        this.param = param;
    }

    public int getSessionId() {
        return sessionId;
    }

    public int getToId() {
        return toId;
    }

    public String getToLoginId() {
        return toLoginId;
    }

    public String getToLogoUrl() {
        return toLogoUrl;
    }

    public int getParamType() {
        return paramType;
    }

    public Object getParam() {
        return param;
    }
}
