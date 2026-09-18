package com.seventies.cafe.personel;

import android.app.Activity;
import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MainActivity extends Activity {
    private WebView webView;

    @Override protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setSupportZoom(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);
        settings.setMediaPlaybackRequiresUserGesture(false);

        webView.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                installPOSCatalogGuard(view);
            }
        });

        webView.loadUrl("https://70lerkafe.com/personel.html");
    }

    private void installPOSCatalogGuard(WebView view) {
        view.evaluateJavascript(
            "(function(){" +
            "if(window.__posCatalogGuardInstalled)return;" +
            "window.__posCatalogGuardInstalled=true;" +
            "var originalOpenPOS=window.openPOS;" +
            "if(typeof originalOpenPOS!=='function')return;" +
            "window.openPOS=async function(){" +
            "try{" +
            "if(typeof sb!=='undefined' && (!Array.isArray(products)||!products.length)){" +
            "var c=await sb.from('categories').select('*').order('sort_order');" +
            "var p=await sb.from('products').select('*').order('sort_order');" +
            "if(!c.error&&!p.error){" +
            "categories=c.data||[];" +
            "products=p.data||[];" +
            "}" +
            "}" +
            "}catch(e){console.warn('POS katalog beklenirken hata:',e);}" +
            "return originalOpenPOS.apply(this,arguments);" +
            "};" +
            "})();",
            null
        );
    }

    @Override public void onBackPressed() {
        if (webView.canGoBack()) webView.goBack(); else super.onBackPressed();
    }
}
