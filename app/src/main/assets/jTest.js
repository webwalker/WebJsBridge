    ppd.ready(function(){
        // 注册方法,让Native层调用
        ppd.registerHandler("functionInJs", function(data, responseCallback) {
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
        document.getElementById("imgNative").src="ppdapi://img/";
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
        /*
        ppd.call('1001',function(result){
            alert("test with callback:" + result);
        });
        */
        //方法2
        ppd.call('1001',testData);
    }

    jTest.closeWin = function(){
        ppd.call('10010003');
    }

    jTest.openWin = function(){
        ppd.call("10010002", {
            url:"https://www.baidu.com?title=百度首页",
            //url:"ppdai://router.ppdai.com/activity/product/main?a=1&b=2",
            winType:1, //0默认为普通窗口,1为专题,2为笔记详情（特殊的头部、底部栏）
            anmiType:1
        });
    }

    jTest.titleBar = function(){
        ppd.call('10010005', {
                             visible:1, //控制整个标题栏是否可见,默认为1可见
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
        ppd.call('1004', {
            visible:1, //控制整个底部栏是否可见,默认为1可见
            type:1, //底部栏类型, 0默认为无底部栏,1专题, 2笔记详情
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
    }

    jTest.attach = function(){
    }

    jTest.userLogin = function(){
    }

    jTest.getLoginStatus = function(){
        ppd.call("", {
            success: function (res) {
                var isLogin = res.data;
            }
        });
    }

    jTest.getUserInfo = function(){
        ppd.call("", {
            success: function (res) {
                var user = res.data;
            }
        });
    }

    jTest.uploadUserIcon = function(){
        ppd.call("", {
            success: function (res) {
                var image = res.data;// true已登录,false未登录
            }
        });
    }

    jTest.interestMap = function(){
    }

    var localId;
    jTest.chooseImage = function(){
        ppd.call("", {
            count: 1, // 默认1, 目前只支持1,待后续扩展
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图,默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机,默认二者都有
            success: function (res) {
                localId = res.data; // 返回选定照片的本地ID列表,localId可以作为img标签的src属性显示图片
                document.getElementById("imgNative").src = "ppdapi://img/?path=" + localId;
            }
        });
    }

    jTest.uploadImage = function(){
        ppd.call("", {
            url:'http://www.baidu.com', //上传的图片服务器地址
            message:'正在上传第1张图片{0}',
            localId: localId, //需要上传的图片的本地ID,由chooseImage接口获得
            success: function (res) {
                var serverId = res.data.url; // 返回图片的URL地址
            }
        });
    }

    jTest.pay = function(){
    }

    //下单
    jTest.order = function(){
    }

    jTest.notifyPay = function(){
    }

    jTest.orderDetail = function(){
    }

    jTest.withdraw = function(){
    }

    jTest.share = function(){
        ppd.call("", {
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
    }

    jTest.replyComment = function(){
    }

    jTest.noteDetail = function(){
    }

    jTest.publishNote = function(){
    }

    jTest.noteFansList = function(){
    }

    jTest.activityPartnerList = function(){
    }

    jTest.noteBrand = function(){
        ppd.noteBrand();
    }

    jTest.noteType = function(data){
        ppd.noteType({
            noteType:data
        });
    }

    jTest.countryList = function(){
    }

    jTest.fansUserList = function(){
    }

    jTest.followUserList = function(){
    }

    jTest.showMsgIcon = function(){
    }

    jTest.onlineService = function(){
    }

    jTest.openChat = function(){
    }

    jTest.liveDetail = function(){
        ppd.call("", {
            activity:{
                ActivityId:"479371"
            }
        });
    }

    jTest.productDetail = function(){
        ppd.call("", {
            seller:{
                Logo:"",
                Seller:"test",//买手名称
                SellerId:"677608" //买手Id
            },
            product:{
                ProductId:"c8dada49-6e39-421d-8250-609385724fb6" //商品Id
            }
        });
    }

    jTest.similarProduct = function(){
    }

    jTest.similarTopic = function(){
        ppd.call("", {
            topicId:"c8dada49-6e39-421d-8250-609385724fb6" //主题Id
        });
    }

    jTest.topicList = function(){
        ppd.call("", {
            topicId:"1001641", //清单Id
            title:"123432424", //清单显示的标题
            productId:"" //产品ID,外面点进去的时候排在第一位,可以不传递
        });
    }

    jTest.search = function(){
        ppd.call("", {
            keys:["a","b","c"]
        });
    }

    jTest.tabHome = function(){
        ppd.call("", {
            name:"jyh",
            subName:""
        });
    }

    jTest.feedBack = function(){
        ppd.call("");
    }

    jTest.contactBook = function(){
        ppd.call("");
    }

    jTest.bindMobile = function(){
        ppd.call("", {
            success:function(res){
                alert("success:" + res.data + "____" + res.msg);
            },
            fail:function(res){
                alert("fail:" + res.data + "____" + res.msg);
            }
        });
    }

    jTest.couponProducts = function(){
        ppd.call("", {
            couponId:"" //优惠券ID
        });
    }

    jTest.pageBack = function(){
        alert(1111);
    }

    jTest.listenPageEvent = function(){
        ppd.call("", {
            //close:pageBack,
            success:function(res){
                var event = res.data;
                alert(event);
            }
        });
    }

    jTest.getDeviceInfo = function(){
        ppd.call("", {
            success: function (res) {
                var device = res.data;
            }
        });
    }

    jTest.callPhone = function(){
        ppd.call("", {
            phoneNumber:"10086"
        });
    }

    jTest.screenShot = function(){
        ppd.call("", {
            success:function(res){
                //var url = res.data.url;
            }
        });
    }

    jTest.getNetworkType = function(){
        ppd.call("", {
            success: function (res) {
                var networkType = res.networkType; // 返回网络类型2g,3g,4g,wifi
                var operator = res.operator; //运营商
            }
        });
    }

    jTest.sendUmengLog = function(){
        ppd.call("", {
            data:"1111111111111111111111111"
        });
    }

    jTest.sendYLog = function(){
        ppd.call("", {
            data:"222222222222222222222222"
        });
    }

    jTest.registEvent = function(){
        ppd.call("", {
            url:"", //需要冒泡该事件的页面URL地址,匹配时才通知页面,为空时则仅通知紧邻的上一个页面
            name:"test", //通知的事件名称
            data:"123" //通知的事件参数信息,可为空
        });
    }

    jTest.clipboard = function(){
        ppd.call("", {
            data:"剪切板..."
        });
    }