package com.ymt.framework.hybrid.model.params;

import java.util.List;

/**
 * Created by xujian on 2016/2/1.
 */
public class JShare {
    private String title;
    private String content;
    private String linkUrl;
    private String imgUrl;
    private List<String> hide;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public void setHide(List<String> hide) {
        this.hide = hide;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public List<String> getHide() {
        return hide;
    }
}
