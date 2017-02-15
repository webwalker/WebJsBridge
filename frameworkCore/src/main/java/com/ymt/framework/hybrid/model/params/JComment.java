package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JComment {
    private int objectId;
    private int objectType;
    private int replyCommentId;
    private String replyUserName;

    public void setObjectId(int objectId) {
        this.objectId = objectId;
    }

    public void setObjectType(int objectType) {
        this.objectType = objectType;
    }

    public void setReplyCommentId(int replyCommentId) {
        this.replyCommentId = replyCommentId;
    }

    public void setReplyUserName(String replyUserName) {
        this.replyUserName = replyUserName;
    }

    public int getObjectId() {
        return objectId;
    }

    public int getObjectType() {
        return objectType;
    }

    public int getReplyCommentId() {
        return replyCommentId;
    }

    public String getReplyUserName() {
        return replyUserName;
    }
}
