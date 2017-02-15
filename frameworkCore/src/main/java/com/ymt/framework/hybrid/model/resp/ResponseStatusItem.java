package com.ymt.framework.hybrid.model.resp;

import java.io.Serializable;

/**
 * Created by xujian on 2015/12/7.
 */
public class ResponseStatusItem implements Serializable {
    /*
    * 调用成功时："xxx:ok" ，其中xxx为调用的接口名
      用户取消时："xxx:cancel"，其中xxx为调用的接口名
    * */
    public String methodStatus;
    //调用失败时：其值为具体错误信息
    public String errMsg;
}
