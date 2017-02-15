package com.ymt.framework.hybrid.model;

import com.ymt.framework.hybrid.model.params.JConfig;

/**
 * Created by xujian on 2016/2/1.
 */
public class JContext {
    private static JContext _instance = null;
    private JConfig config;

    private JContext() {
    }

    public static JContext getInstance() {
        if (_instance == null) {
            _instance = new JContext();
        }
        return _instance;
    }

    public JConfig getConfig() {
        return config;
    }

    public void setConfig(JConfig config) {
        this.config = config;
    }
}
