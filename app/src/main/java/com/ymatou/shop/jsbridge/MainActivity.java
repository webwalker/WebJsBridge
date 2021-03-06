package com.ymatou.shop.jsbridge;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.widget.Button;
import android.widget.Toast;

import com.google.gson.Gson;
import com.ymt.framework.hybrid.BridgeWebView;
import com.ymt.framework.hybrid.defines.IJsCallBack;
import com.ymt.framework.hybrid.handler.HandlerBuilder;
import com.ymt.framework.hybrid.model.BridgeEnum;
import com.ymt.framework.hybrid.model.WebBusItem;

import de.greenrobot.event.EventBus;

public class MainActivity extends Activity implements View.OnClickListener {
    private final String TAG = "MainActivity";
    BridgeWebView webView;
    Button button;
    int RESULT_CODE = 0;
    ValueCallback<Uri> mUploadMessage;

    static class Location {
        String address;
    }

    static class User {
        String name;
        Location location;
        String testStr;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        EventBus.getDefault().register(this);

        webView = (BridgeWebView) findViewById(R.id.webView);
        button = (Button) findViewById(R.id.button);
        button.setOnClickListener(this);
        webView.setWebChromeClient(new WebChromeClient() {
            @SuppressWarnings("unused")
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String AcceptType, String capture) {
                this.openFileChooser(uploadMsg);
            }

            @SuppressWarnings("unused")
            public void openFileChooser(ValueCallback<Uri> uploadMsg, String AcceptType) {
                this.openFileChooser(uploadMsg);
            }

            public void openFileChooser(ValueCallback<Uri> uploadMsg) {
                mUploadMessage = uploadMsg;
                pickFile();
            }
        });

        webView.loadUrl("file:///android_asset/demo.html");

        //HandlerBuilder.build();

        User user = new User();
        Location location = new Location();
        location.address = "abc";
        user.location = location;
        user.name = "xujian";

        // 调用页面方法
        webView.callHandler("functionInJs", new Gson().toJson(user), new IJsCallBack() {
            @Override
            public void onCallBack(String data) {
                Toast toast = Toast.makeText(MainActivity.this, data, Toast.LENGTH_SHORT);
                toast.show();
            }
        });

        //发送数据，无回调
        //webView.send("native:hello"); //window.WebViewJavascriptBridge.init中可以接收到回调
        //执行事件
        webView.sendEvent("alert(10000000);");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        EventBus.getDefault().unregister(this);
    }

    public void pickFile() {
        Intent chooserIntent = new Intent(Intent.ACTION_GET_CONTENT);
        chooserIntent.setType("image/*");
        startActivityForResult(chooserIntent, RESULT_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (requestCode == RESULT_CODE) {
            if (null == mUploadMessage) {
                return;
            }
            Uri result = intent == null || resultCode != RESULT_OK ? null : intent.getData();
            mUploadMessage.onReceiveValue(result);
            mUploadMessage = null;
        }
    }

    @Override
    public void onClick(View v) {
        if (button.equals(v)) {
            webView.callHandler("functionInJs", "data from Java", new IJsCallBack() {

                @Override
                public void onCallBack(String data) {
                    // TODO Auto-generated method stub
                    Log.i(TAG, "reponse data from js " + data);
                }

            });
        }
    }

    // bridge callback entrance
    public void onEventMainThread(WebBusItem item) {
        if (item == null) return;
        BridgeEnum bridge = BridgeEnum.getById(item.type);
        if (bridge == BridgeEnum.Default) return;

        String name = bridge.getNames();
        if (!TextUtils.isEmpty(name)) {
            HandlerBuilder.get(name).callback(item.data);
        }
    }
}