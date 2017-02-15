package com.ymt.framework.hybrid.model.params;

/**
 * Created by xujian on 2016/2/1.
 */
public class JLiveDetail {
    private SellerEntity seller;
    private ActivityEntity activity;

    public void setSeller(SellerEntity seller) {
        this.seller = seller;
    }

    public void setActivity(ActivityEntity activity) {
        this.activity = activity;
    }

    public SellerEntity getSeller() {
        return seller;
    }

    public ActivityEntity getActivity() {
        return activity;
    }

    public static class SellerEntity {
        private String Flag;
        private String Logo;
        private String Seller;
        private String SellerId;

        public void setFlag(String Flag) {
            this.Flag = Flag;
        }

        public void setLogo(String Logo) {
            this.Logo = Logo;
        }

        public void setSeller(String Seller) {
            this.Seller = Seller;
        }

        public void setSellerId(String SellerId) {
            this.SellerId = SellerId;
        }

        public String getFlag() {
            return Flag;
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

    public static class ActivityEntity {
        private String ActivityContent;
        private String ActivityId;
        private String ActivityName;
        private String ActivityStatusText;
        private String EndTime;
        private String ShopAddress;
        private String StartTime;

        public void setActivityContent(String ActivityContent) {
            this.ActivityContent = ActivityContent;
        }

        public void setActivityId(String ActivityId) {
            this.ActivityId = ActivityId;
        }

        public void setActivityName(String ActivityName) {
            this.ActivityName = ActivityName;
        }

        public void setActivityStatusText(String ActivityStatusText) {
            this.ActivityStatusText = ActivityStatusText;
        }

        public void setEndTime(String EndTime) {
            this.EndTime = EndTime;
        }

        public void setShopAddress(String ShopAddress) {
            this.ShopAddress = ShopAddress;
        }

        public void setStartTime(String StartTime) {
            this.StartTime = StartTime;
        }

        public String getActivityContent() {
            return ActivityContent;
        }

        public String getActivityId() {
            return ActivityId;
        }

        public String getActivityName() {
            return ActivityName;
        }

        public String getActivityStatusText() {
            return ActivityStatusText;
        }

        public String getEndTime() {
            return EndTime;
        }

        public String getShopAddress() {
            return ShopAddress;
        }

        public String getStartTime() {
            return StartTime;
        }
    }
}
