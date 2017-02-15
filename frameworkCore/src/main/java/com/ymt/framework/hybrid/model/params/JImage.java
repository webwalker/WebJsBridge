package com.ymt.framework.hybrid.model.params;

import java.util.List;

/**
 * Created by xujian on 2016/2/1.
 */
public class JImage {
    private int count;
    private String localId;
    private List<String> sizeType;
    private List<String> sourceType;

    public void setCount(int count) {
        this.count = count;
    }

    public void setSizeType(List<String> sizeType) {
        this.sizeType = sizeType;
    }

    public void setSourceType(List<String> sourceType) {
        this.sourceType = sourceType;
    }

    public String getLocalId() {
        return localId;
    }

    public void setLocalId(String localId) {
        this.localId = localId;
    }

    public int getCount() {
        return count;
    }

    public List<String> getSizeType() {
        return sizeType;
    }

    public List<String> getSourceType() {
        return sourceType;
    }
}
