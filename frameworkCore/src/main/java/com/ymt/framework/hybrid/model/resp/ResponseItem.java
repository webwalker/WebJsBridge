package com.ymt.framework.hybrid.model.resp;

import java.io.Serializable;

/**
 * Created by xujian on 2015/12/7.
 */
public class ResponseItem implements Serializable {
    // 0未知 1成功 2失败 3完成 4取消
    public int code;
    public String msg;
    public Object data;
}
