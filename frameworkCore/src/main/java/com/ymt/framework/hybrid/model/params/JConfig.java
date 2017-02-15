package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JConfig {
    private String domain = "ymatou.com";
    private boolean debug;
    private String sourceId;
    private String timestamp;
    private String signature;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }

    public String getSourceId() {
        return sourceId;
    }

    public void setSourceId(String sourceId) {
        this.sourceId = sourceId;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }


    public void setSignature(String signature) {
        this.signature = signature;
    }


    public boolean isDebug() {
        return debug;
    }


    public String getTimestamp() {
        return timestamp;
    }


    public String getSignature() {
        return signature;
    }
}
