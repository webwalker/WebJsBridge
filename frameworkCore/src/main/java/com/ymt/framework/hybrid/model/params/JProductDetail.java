package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JProductDetail {
    private SellerEntity seller;
    private ProductEntity product;

    public void setSeller(SellerEntity seller) {
        this.seller = seller;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public SellerEntity getSeller() {
        return seller;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public static class SellerEntity {
        private String Logo;
        private String Seller;
        private String SellerId;

        public void setLogo(String Logo) {
            this.Logo = Logo;
        }

        public void setSeller(String Seller) {
            this.Seller = Seller;
        }

        public void setSellerId(String SellerId) {
            this.SellerId = SellerId;
        }

        public String getLogo() {
            return Logo;
        }

        public String getSeller() {
            return Seller;
        }

        public String getSellerId() {
            return SellerId;
        }
    }

    public static class ProductEntity {
        private String ProductId;

        public void setProductId(String ProductId) {
            this.ProductId = ProductId;
        }

        public String getProductId() {
            return ProductId;
        }
    }
}
