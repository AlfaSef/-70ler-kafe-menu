window.SUPABASE_CONFIG = {
  url: "https://ssccfrvbzlapnnqeruhy.supabase.co",
  publishableKey: "sb_publishable_srP9mm2mgcGv9Ac-ZZdpQg_WROSs6py"
};

// Yönetici paneli ürün araması + premium yönetim arayüzü.
(function(){
  function installPremiumAdmin(){
    if(document.getElementById('premiumAdminRuntime')) return;
    var style=document.createElement('style'); style.id='premiumAdminRuntime';
    style.textContent=`
      #adminView{max-width:1180px;margin:0 auto;padding:26px 24px 60px;color:#292522}
      #adminView header{position:relative;text-align:left;margin:0 0 22px;padding:28px 32px 25px;border:1px solid rgba(47,41,37,.16);border-radius:26px;background:linear-gradient(135deg,#fffaf4 0%,#f9edf3 58%,#eef5ef 100%);box-shadow:0 14px 38px rgba(55,43,35,.10),inset 0 1px 0 rgba(255,255,255,.85);overflow:hidden}
      #adminView header:before{content:"";position:absolute;right:-55px;top:-95px;width:250px;height:250px;border:28px solid rgba(207,91,134,.12);border-radius:50%}
      #adminView header:after{content:"";position:absolute;left:-55px;bottom:-115px;width:210px;height:210px;border:24px solid rgba(91,139,128,.10);border-radius:50%}
      #adminView .retro-title{position:relative;z-index:1;margin:0;color:#c64f7e;font-size:42px;line-height:1.05;letter-spacing:-.7px;text-shadow:none}
      #adminView .subtitle{position:relative;z-index:1;margin:9px 0 0;color:#75685f;font-size:15px}
      #adminView .subtitle:after{content:"  •  Güvenli yönetim alanı";color:#9b877a;font-size:12px}
      #adminView .panel{border:1px solid rgba(47,41,37,.14);border-radius:22px;background:rgba(255,252,247,.90);box-shadow:0 12px 30px rgba(55,43,35,.08),inset 0 1px 0 rgba(255,255,255,.9);padding:22px;margin:0 0 18px}
      #adminView #dashboard>.panel:first-child{position:sticky;top:12px;z-index:20;backdrop-filter:blur(14px);background:rgba(255,250,244,.90);padding:14px 16px;box-shadow:0 10px 28px rgba(55,43,35,.11)}
      #adminView .actions{gap:9px;flex-wrap:wrap}
      #adminView .btn{min-height:43px;border:1px solid rgba(47,41,37,.34);border-radius:12px;padding:9px 16px;background:linear-gradient(180deg,#d8eee5,#c4dfd5);color:#292522;font-family:Georgia,"Times New Roman",serif;font-weight:700;box-shadow:0 3px 0 rgba(47,41,37,.13),0 7px 16px rgba(55,43,35,.06);transition:transform .16s ease,box-shadow .16s ease,background .16s ease}
      #adminView .btn:hover{transform:translateY(-2px);box-shadow:0 4px 0 rgba(47,41,37,.12),0 10px 20px rgba(55,43,35,.10)}
      #adminView .btn.secondary{background:#fffaf4}
      #adminView .btn.danger{background:linear-gradient(180deg,#f3cbc7,#e9b9b4);color:#6f2924}
      #adminView #productFormPanel{border-color:rgba(198,79,126,.24);background:linear-gradient(180deg,#fffaf6,#fffdf9)}
      #adminView #productFormPanel h2,#adminView .admin-products-panel h2,#adminView #loginPanel h2{margin:0 0 15px;color:#3b302a;font-size:27px;letter-spacing:-.2px}
      #adminView .form{gap:15px}
      #adminView .form label{font-weight:700;color:#55483f;font-size:14px}
      #adminView .form input:not([type="checkbox"]),#adminView .form textarea,#adminView .form select{margin-top:7px;width:100%;box-sizing:border-box;border:1px solid #d7c8b8;border-radius:12px;background:#fffdfa;color:#2f2925;padding:12px 13px;font:500 15px/1.35 Georgia,"Times New Roman",serif;outline:none;transition:border-color .18s,box-shadow .18s,background .18s}
      #adminView .form textarea{min-height:88px;resize:vertical}
      #adminView .form input:not([type="checkbox"]):focus,#adminView .form textarea:focus,#adminView .form select:focus{border-color:#cf5b86;background:#fff;box-shadow:0 0 0 4px rgba(207,91,134,.10)}
      #adminView .admin-products-panel{padding:22px 20px 18px}
      #adminView .admin-products-head{padding:0 2px 14px;margin-bottom:12px;border-bottom:1px solid #eadfd3}
      #adminView .admin-products-head h2{font-size:30px;margin:0}
      #adminView .admin-products-subtitle{color:#8a796c;font-size:13px}
      #adminView .admin-search-box{margin:0 0 8px}
      #adminView .admin-search{height:58px;border:1px solid #d2c0ae;border-radius:15px;background:#fffdfa;box-shadow:inset 0 1px 2px rgba(55,43,35,.03);font-size:16px}
      #adminView .admin-search:focus{border-color:#cf5b86;box-shadow:0 0 0 4px rgba(207,91,134,.10),inset 0 1px 2px rgba(55,43,35,.03)}
      #adminView .admin-product-count{padding-left:2px;color:#9a887a;font-size:12px;font-weight:700}
      #adminView #adminProducts{display:grid;gap:10px}
      #adminView #adminProducts .item{display:grid;grid-template-columns:58px minmax(0,1fr) auto auto;align-items:center;gap:14px;padding:12px 13px;border:1px solid #e3d8cc;border-radius:16px;background:linear-gradient(180deg,#fffdfa,#fbf7f1);box-shadow:0 4px 12px rgba(55,43,35,.045);transition:transform .15s ease,border-color .15s ease,box-shadow .15s ease}
      #adminView #adminProducts .item:hover{transform:translateY(-1px);border-color:#d4b9c6;box-shadow:0 8px 20px rgba(55,43,35,.09)}
      #adminView #adminProducts .thumb{width:58px;height:58px;object-fit:cover;border-radius:12px;border:1px solid #ddcfbf;background:#eee5da}
      #adminView #adminProducts .item-main{min-width:0}
      #adminView #adminProducts .item-main b{display:block;color:#332b27;font-size:15px;line-height:1.2;margin-bottom:4px}
      #adminView #adminProducts .item-main .muted{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#89796e;font-size:12px}
      #adminView #adminProducts .pill{white-space:nowrap;padding:6px 9px;border:1px solid #b9d2c8;border-radius:999px;background:#e5f1ec;color:#37665a;font-size:11px;font-weight:800}
      #adminView #adminProducts .actions{justify-content:flex-end}
      #adminView #adminProducts .actions .btn{min-height:38px;padding:7px 12px;border-radius:10px;font-size:13px}
      #adminView .portion-editor,#adminView .wrap-editor{border:1px solid #e2d4c6;border-radius:16px;padding:15px;background:#fcf8f3;box-shadow:inset 0 1px 0 #fff}
      #adminView .portion-editor-title{color:#4a3d35;font-size:14px;font-weight:800;margin-bottom:6px}
      #adminView .login{max-width:480px;margin:40px auto}
      #adminView #saveMsg{min-height:18px;margin:3px 0 0;font-weight:700;color:#8b5d72}
      @media(max-width:760px){#adminView{padding:14px 12px 40px}#adminView header{padding:22px 20px;border-radius:20px}#adminView .retro-title{font-size:31px}#adminView .subtitle{font-size:13px}#adminView .subtitle:after{display:block;margin-top:4px}#adminView #dashboard>.panel:first-child{position:static}#adminView .panel{padding:16px;border-radius:18px}#adminView #adminProducts .item{grid-template-columns:50px minmax(0,1fr);gap:10px;padding:10px}#adminView #adminProducts .thumb{width:50px;height:50px}#adminView #adminProducts .pill{grid-column:2;justify-self:start}#adminView #adminProducts .actions{grid-column:2;justify-content:flex-start}#adminView #adminProducts .actions .btn{min-height:36px}}
    `;
    document.head.appendChild(style);
  }
  function installProductSearch(){
    var list=document.getElementById('adminProducts');
    if(!list || document.getElementById('liveAdminProductSearch')) return;
    var panel=list.closest('.admin-products-panel') || list.parentElement;
    if(!panel) return;
    var box=document.createElement('div'); box.id='liveAdminSearchBox'; box.className='admin-search-box';
    box.innerHTML='<span class="admin-search-icon">⌕</span><input id="liveAdminProductSearch" class="admin-search" type="search" placeholder="Ürün ara... (örn. öğrenci dürüm, pilav, ayran)" autocomplete="off"><button type="button" id="liveAdminSearchClear" class="admin-search-clear">×</button>';
    var heading=panel.querySelector('.admin-products-head');
    if(heading && heading.parentNode) heading.parentNode.insertBefore(box,heading.nextSibling); else panel.insertBefore(box,list);
    var input=document.getElementById('liveAdminProductSearch'), clear=document.getElementById('liveAdminSearchClear');
    function filter(){var q=(input.value||'').trim().toLocaleLowerCase('tr-TR'),items=list.querySelectorAll('.item'),shown=0;items.forEach(function(item){var ok=!q||item.textContent.toLocaleLowerCase('tr-TR').indexOf(q)!==-1;item.style.display=ok?'':'none';if(ok)shown++});clear.style.display=q?'block':'none';var count=document.getElementById('liveAdminSearchCount');if(!count){count=document.createElement('div');count.id='liveAdminSearchCount';count.className='admin-product-count';box.parentNode.insertBefore(count,box.nextSibling)}count.textContent=q?(shown+' ürün bulundu'):(items.length+' ürün')}
    input.addEventListener('input',filter); clear.addEventListener('click',function(){input.value='';input.focus();filter()}); filter();
  }
  function watch(){installPremiumAdmin();installProductSearch();var obs=new MutationObserver(function(){installPremiumAdmin();installProductSearch()});obs.observe(document.documentElement,{childList:true,subtree:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
})();
