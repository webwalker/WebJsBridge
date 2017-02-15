package com.ymt.framework.hybrid.model.params;

import java.util.List;

/**
 * Created by xujian on 2016/2/1.
 */
public class JChatProduct {
    private int ProductId;
    private int Price;
    private int IsReplay;
    private String ProductDesc;
    private List<String> ProductPics;

    public void setProductId(int ProductId) {
        this.ProductId = ProductId;
    }

    public void setPrice(int Price) {
        this.Price = Price;
    }

    public void setIsReplay(int IsReplay) {
        this.IsReplay = IsReplay;
    }

    public void setProductDesc(String ProductDesc) {
        this.ProductDesc = ProductDesc;
    }

    public void setProductPics(List<String> ProductPics) {
        this.ProductPics = ProductPics;
    }

    public int getProductId() {
        return ProductId;
    }

    public int getPrice() {
        return Price;
    }

    public int getIsReplay() {
        return IsReplay;
    }

    public String getProductDesc() {
        return ProductDesc;
    }

    public List<String> getProductPics() {
        return ProductPics;
    }
}
