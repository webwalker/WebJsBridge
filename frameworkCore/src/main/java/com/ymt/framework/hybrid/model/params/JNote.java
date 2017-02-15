package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JNote {
    private String noteId;
    private String noteVersion;
    private String activityId;
    private String activityName;

    public void setNoteId(String noteId) {
        this.noteId = noteId;
    }

    public void setNoteVersion(String noteVersion) {
        this.noteVersion = noteVersion;
    }

    public void setActivityId(String activityId) {
        this.activityId = activityId;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public String getNoteId() {
        return noteId;
    }

    public String getNoteVersion() {
        return noteVersion;
    }

    public String getActivityId() {
        return activityId;
    }

    public String getActivityName() {
        return activityName;
    }
}
