    ymt.ready(function(){
        // 注册方法，让Native层调用
        ymt.registerHandler("functionInJs", function(data, responseCallback) {
            document.getElementById("show").innerHTML = ("data from Java: = " + data);
            var responseData = "from js callback.";
            responseCallback(responseData);
        });
    });

    var jTest = {};
    jTest.testDiv = function() {
        document.getElementById("show").innerHTML = document.getElementsByTagName("html")[0].innerHTML;
    }

    jTest.testClick = function() {
        var str1 = document.getElementById("text1").value;
        var str2 = document.getElementById("text2").value;
        //send message to native
        var data = {id: 1, content: "这是一个图片 <img src=\"a.png\"/> test\r\nhahaha"};
        window.WebViewJavascriptBridge.send(
            data,
            function(responseData) {
                document.getElementById("show").innerHTML = "DefaultHandler, data = " + responseData
            }
        );
    }

    jTest.testClick1 = function() {
        var str1 = document.getElementById("text1").value;
        var str2 = document.getElementById("text2").value;

        //call native method
        window.WebViewJavascriptBridge.callHandler(
            'submitFromWeb',
            {'param': '中文测试'},
            function(responseData) {
                document.getElementById("show").innerHTML = "submitFromWeb Handler, data = " + responseData
            }
        );
    }

    jTest.bridgeLog = function(logContent) {
        document.getElementById("show").innerHTML = logContent;
    }

    jTest.proxyImg = function(){
        document.getElementById("imgNative").src="ymtapi://img/";
        alert("proxyImg");
    }

    jTest.test = function(){
        var testData = {name:'xujian',
            success:function(res){
                alert("success:"+ res.data.name);
            },
            complete:function(res){
                alert("complete:" + res.data.name);
            },
            fail:function(res){
                alert("fail:" + res.data.name + "____" + res.msg);
            }
        };
        //方法1
        /*ymt.test(testData, function(result){
            alert("test with callback:" + result);
        });*/
        //方法2
        ymt.test(testData);
    }

    jTest.closeWin = function(){
        ymt.closeWin();
    }

    jTest.openWin = function(){
        ymt.openWin({
            url:"http://sq0.ymatou.com/forBuyerApp/discover/detail?topic=398&title=%E6%B5%8B%E8%AF%95%E6%8F%92%E5%85%A5%E5%95%86%E5%93%81&ShareTitle=%E6%B5%8B%E8%AF%95%E6%8F%92%E5%85%A5%E5%95%86%E5%93%81&ShareContent=asdfasdfsdfasdfasdfsadf&SharePicUrl=http%3a%2f%2fp6.img.ymatou.com%2fG01%2fM00%2f05%2f32%2frBBlD1YkffuAN1TvAADEF_KhqGA398_s.jpg&ShareLinkUrl=http%3a%2f%2fsq0.ymatou.com%2fforBuyerApp%2fdiscover%2fdetail%3ftopic%3d398&UserId=395528&AccessToken=7A14222AD0A4A56E5DCF417AEACB125F60304602F4C43BE38F908A44CB4182976613D3A87C875652E5B5920D55D40486EFF7ECF048BF89AB&IDFA=EB4D5648-E702-4DB2-B9F3-89062334AE0B&DeviceToken=8e99ab0988cfda50478eded6372d5dbd7782b1c000cc139404cf4f0ceb7f6cd1&Wifi=1&AppName=Buyer&DeviceId=91C1AB2E-9D59-487D-9277-2A0620D954D1",
            winType:1, //0默认为普通窗口，1为专题，2为笔记详情（特殊的头部、底部栏）
            anmiType:1
        });
    }

    jTest.titleBar = function(){
        ymt.titleBar({
            visible:1, //控制整个标题栏是否可见，默认为1可见
            title:"this is a title",
            backIcon:{
                visible:1, //是否显示返回按钮, 默认为1显示
                onClick:'jTest.pageBack' //点击事件
            },
            shareIcon:{
                visible:1, //是否显示分享按钮, 默认为1显示
                title: "J标题",
                content: "J内容",
                moment: "朋友圈",
                sina:"",
                linkUrl: "http://www.baidu.com",
                imgUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=988553887,3280974760&fm=80", // 分享图标
                hide:["SinaWeibo"]
            },
            msgIcon:1, //是否显示消息图标
            cartIcon:1,
            reportIcon:1,
            editIcon:1
        });
    }

    jTest.bottomBar = function(){
        ymt.bottomBar({
            visible:1, //控制整个底部栏是否可见，默认为1可见
            type:1, //底部栏类型, 0默认为无底部栏，1专题, 2笔记详情
            shareIcon: { //分享相关的信息
                title: "J标题",
                content: "J内容",
                moment: "朋友圈",
                sina:"放到",
                linkUrl: "http://www.baidu.com",
                imgUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=988553887,3280974760&fm=80", // 分享图标
                hide:["SinaWeibo"],
            }
        });
    }

    jTest.pageRefreshType = function(){
        ymt.pageRefreshType({refreshType:1}); //1刷新当前页，0默认刷新回到首页
    }

    jTest.attach = function(){
        ymt.attach({type:1, data:{}});
    }

    jTest.userLogin = function(){
        ymt.userLogin();
    }

    jTest.getLoginStatus = function(){
        ymt.getLoginStatus({
            success: function (res) {
                var isLogin = res.data;
            }
        });
    }

    jTest.getUserInfo = function(){
        ymt.getUserInfo({
            success: function (res) {
                var user = res.data;
            }
        });
    }

    jTest.uploadUserIcon = function(){
        ymt.uploadUserIcon({
            success: function (res) {
                var image = res.data;// true已登录，false未登录
            }
        });
    }

    jTest.interestMap = function(){
        ymt.interestMap();
    }

    var localId;
    jTest.chooseImage = function(){
        ymt.chooseImage({
            count: 1, // 默认1, 目前只支持1，待后续扩展
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                localId = res.data; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                document.getElementById("imgNative").src = "ymtapi://img/?path=" + localId;
            }
        });
    }

    jTest.uploadImage = function(){
        ymt.uploadImage({
            url:'http://www.baidu.com', //上传的图片服务器地址
            message:'正在上传第1张图片{0}',
            localId: localId, //需要上传的图片的本地ID，由chooseImage接口获得
            success: function (res) {
                var serverId = res.data.url; // 返回图片的URL地址
            }
        });
    }

    jTest.pay = function(){
        ymt.pay({
            orderId:"1000000001" //待支付的订单编号
        });
    }

    //下单
    jTest.order = function(){
        ymt.order({
            payMode:0, //支付方式，0全款,1定金
            orders:[{
                        skuId:"", //productId、catalogId, 选好的SkuId
                        count:1, //购买数量
                        price:100.1, //下单的商品单价
                    },{
                        skuId:"",
                        count:1,
                        price:100.1,
                    }]
        });
    }

    jTest.notifyPay = function(){
        ymt.notifyPay({
            orderId:"10000000001", //目前可为空
            payType:20, //支付类型,用于扩展其他Web支付方式，20 PayPal
            payStatus:1, //支付状态, 1成功，2失败，3取消
            payMessage:"" //支付消息,提示给用户的消息，支付失败时，如果该字段为空则只显示支付失败
        });
    }

    jTest.orderDetail = function(){
        ymt.orderDetail({
            orderId:"1000000001" //订单编号
        });
    }

    jTest.withdraw = function(){
        ymt.withdraw();
    }

    jTest.share = function(){
        ymt.share({
            title: "标题",
            content: "内容",
            moment: "朋友圈",
            sina:"",
            linkUrl: "http://www.baidu.com",
            imgUrl: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=988553887,3280974760&fm=80", // 分享图标
            hide:["SinaWeibo"],
            success: function (res) {
               alert('成功');
            },
            cancel: function (res) {
               alert('取消');
            }
        });
    }

    jTest.comment = function(){
        ymt.comment({
            objectId:"100297352",
            objectType:5
        });
    }

    jTest.replyComment = function(){
        ymt.replyComment({
            objectId:"100296896",
            objectType:5,
            replyCommentId:15179460,
            replyUserName: 'hellojyj'
        });
    }

    jTest.noteDetail = function(){
        ymt.noteDetail({
            noteId:"100296896",
            noteVersion:"20160226092040778"
        });
    }

    jTest.publishNote = function(){
        ymt.publishNote({
            activityId:"",
            activityName:""
        });
    }

    jTest.noteFansList = function(){
        ymt.noteFansList({
            noteId:"100296896",
            noteVersion:""
        });
    }

    jTest.activityPartnerList = function(){
        ymt.activityPartnerList({
            activityId:"100296896"
        });
    }

    jTest.noteBrand = function(){
        ymt.noteBrand();
    }

    jTest.noteType = function(data){
        ymt.noteType({
            noteType:data
        });
    }

    jTest.countryList = function(){
        ymt.countryList();
    }

    jTest.fansUserList = function(){
        ymt.fansUserList({
            userId:'4081'
        });
    }

    jTest.followUserList = function(){
        ymt.followUserList({
            userId:'4081'
        });
    }

    jTest.showMsgIcon = function(){
        ymt.showMsgIcon();
    }

    jTest.onlineService = function(){
        ymt.onlineService();
    }

    jTest.openChat = function(){
        ymt.openChat({
            sessionId: "11111_22222",
            toId:"22222", //接收者id
            toLoginId:"lunchzhao", //接收者昵称
            toLogoUrl:"http://.../user.png", //接收者头像
            isM2C:false, //是否来源于M2C
            paramType:1, //0普通聊天，1订单，2商品
            param:{
                      ActuallyPrice: 123,
                      Catalog: "",
                      DistributionType: 3,
                      DistributionTypeText: "贝海直邮",
                      Earnest: 123,
                      FreeShipping: true,
                      Freight: 0,
                      IsActivityProduct: false,
                      IsMultiProduct: false,
                      LeaveWord: "留言",
                      OrderId: "105401381",
                      OrderTotalPrice: 123,
                      PaidAmount: 123,
                      PaidInFull: true,
                      Platform: 2,
                      Price: 123,
                      PriceType: 0,
                      ProductCount: 1,
                      ProductDes: "多发点",
                      ProductId: null,
                      ProductPic: "http://p5.img.ymatou.com/upload/product/original/ae78133670794cbead1d4349e064ecdf_o.jpg",
                      ProductsNum: 1,
                      Remarks: "",
                      SellerId: "3383",
                      TailAmount: 0,
                      TariffType: 0,
                      TotalPrice: 0,
                      TradingStatus: 18,
                      TradingStatusText: "待付款"
            }
    /* 商品
    {
        "ProductId": "c8dada49-6e39-421d-8250-609385724fb6",
        "Price": 59,
        "IsReplay": 0,
        "ProductDesc": "KOSE 高丝 clearturn 精华面膜 玻尿酸 胶原蛋白 30片装 多款可选",
        "ProductPics": [
            "http://p9.img.ymatou.com/G02/upload/product/big/M06/59/4B/CgvUBVYExeeAfVCqAAeEDeWmUGo856_b.jpg",
            "http://p10.img.ymatou.com/G02/upload/product/big/M09/59/6C/CgvUA1YExg2AO0ZDAAc3YBxePYk091_b.jpg",
            "http://p10.img.ymatou.com/G02/upload/product/big/M02/59/67/CgvUBFYExqWADFNHAAXG3213lcA613_b.jpg",
            "http://p7.img.ymatou.com/G02/upload/product/big/M02/59/5B/CgvUBVYExqaADba-AAXYiWAGT80590_b.jpg",
            "http://pm3.img.ymatou.com/G02/upload/product/big/M05/A0/F5/CgvUBFY5vPaAd4N1AAERSNdvwVo571_b.jpg"
        ]
    }
    */
        });
    }

    jTest.liveDetail = function(){
        ymt.liveDetail({
            activity:{
                ActivityId:"479371"
            }
        });
    }

    jTest.productDetail = function(){
        ymt.productDetail({
            seller:{
                Logo:"http://p10.img.ymatou.com/G02/upload/product/big/M02/59/67/CgvUBFYExqWADFNHAAXG3213lcA613_b.jpg",
                Seller:"test",//买手名称
                SellerId:"677608" //买手Id
            },
            product:{
                ProductId:"c8dada49-6e39-421d-8250-609385724fb6" //商品Id
            }
        });
    }

    jTest.similarProduct = function(){
        //有则传，无则不传，必需的参数信息：id、pic、description、price
        ymt.similarProduct({
            id:"", //商品id
            pic:"", //商品图片
            productType:3, // 商品平台   1:扫货  2:现货  3:活动
            deliveryType:0, //发货类型： 0未知 1国内  2直邮   3贝海直邮  4卖家保税 5贝海保税 6第三方认证直邮 7拼邮
            tariffType:0, //0：不包邮不包税 1:包邮 2:包税 3:包邮包税
            refundType:0, // 0不支持 1官方  2非官方
            description:"", //商品描述
            price:100, //商品价格
            priceType:0, //价格类型 0普通 1新人价 2VIP价   3运营活动价  4关注可享VIP
            remainStock:0, // 剩余库存
        });
    }

    jTest.similarTopic = function(){
        ymt.similarTopic({
            topicId:"c8dada49-6e39-421d-8250-609385724fb6" //主题Id
        });
    }

    jTest.topicList = function(){
        ymt.topicList({
            topicId:"1001641", //清单Id
            title:"123432424", //清单显示的标题
            productId:"" //产品ID，外面点进去的时候排在第一位，可以不传递
        });
    }

    jTest.search = function(){
        ymt.search({
            keys:["a","b","c"]
        });
    }

    jTest.tabHome = function(){
        ymt.tabHome({
            name:"jyh",
            subName:""
        });
    }

    jTest.feedBack = function(){
        ymt.feedBack();
    }

    jTest.contactBook = function(){
        ymt.contactBook();
    }

    jTest.bindMobile = function(){
        ymt.bindMobile({
            success:function(res){
                alert("success:" + res.data + "____" + res.msg);
            },
            fail:function(res){
                alert("fail:" + res.data + "____" + res.msg);
            }
        });
    }

    jTest.couponProducts = function(){
        ymt.couponProducts({
            couponId:"" //优惠券ID
        });
    }

    jTest.pageBack = function(){
        alert(1111);
    }

    jTest.listenPageEvent = function(){
        ymt.listenPageEvent({
            //close:pageBack,
            success:function(res){
                var event = res.data;
                alert(event);
            }
        });
    }

    jTest.getDeviceInfo = function(){
        ymt.getDeviceInfo({
            success: function (res) {
                var device = res.data;
            }
        });
    }

    jTest.callPhone = function(){
        ymt.callPhone({
            phoneNumber:"10086"
        });
    }

    jTest.screenShot = function(){
        ymt.screenShot({
            success:function(res){
                //var url = res.data.url;
            }
        });
    }

    jTest.getNetworkType = function(){
        ymt.getNetworkType({
            success: function (res) {
                var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                var operator = res.operator; //运营商
            }
        });
    }

    jTest.sendUmengLog = function(){
        ymt.sendUmengLog({
            data:"1111111111111111111111111"
        });
    }

    jTest.sendYLog = function(){
        ymt.sendYLog({
            data:"222222222222222222222222"
        });
    }

    jTest.registEvent = function(){
        ymt.registEvent({
            url:"", //需要冒泡该事件的页面URL地址，匹配时才通知页面，为空时则仅通知紧邻的上一个页面
            name:"test", //通知的事件名称
            data:"123" //通知的事件参数信息,可为空
        });
    }

    jTest.clipboard = function(){
        ymt.clipboard({
            data:"剪切板..."
        });
    }

    jTest.openUrl = function(){
        ymt.openWin({
            url:"http://www.baidu.com",
            winType:-1
        });
     }

    jTest.command = function(name, data){
        ymt.command(name, data);
    }