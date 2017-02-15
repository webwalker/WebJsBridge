package com.ymt.framework.hybrid.model.params;

import java.util.List;

/**
 * Created by xujian on 2016/2/1.
 */
public class JTitleBar {
    private int visible;
    private int backIcon;
    private List<MoreIconEntity> moreIcon;

    public void setVisible(int visible) {
        this.visible = visible;
    }

    public void setBackIcon(int backIcon) {
        this.backIcon = backIcon;
    }

    public void setMoreIcon(List<MoreIconEntity> moreIcon) {
        this.moreIcon = moreIcon;
    }

    public int getVisible() {
        return visible;
    }

    public int getBackIcon() {
        return backIcon;
    }

    public List<MoreIconEntity> getMoreIcon() {
        return moreIcon;
    }

    public static class MoreIconEntity {
        private String title;
        private String url;

        public void setTitle(String title) {
            this.title = title;
        }

        public void setUrl(String url) {
            this.url = url;
        }

        public String getTitle() {
            return title;
        }

        public String getUrl() {
            return url;
        }
    }
}
