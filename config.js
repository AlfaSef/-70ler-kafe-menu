window.SUPABASE_CONFIG = {
  url: "https://ssccfrvbzlapnnqeruhy.supabase.co",
  publishableKey: "sb_publishable_srP9mm2mgcGv9Ac-ZZdpQg_WROSs6py"
};

// Yönetici paneli ürün araması: yayınlanan eski index.html sürümlerinde de çalışır.
(function(){
  function installProductSearch(){
    var list=document.getElementById('adminProducts');
    if(!list || document.getElementById('liveAdminProductSearch')) return;
    var panel=list.closest('.admin-products-panel') || list.parentElement;
    if(!panel) return;
    var box=document.createElement('div');
    box.id='liveAdminSearchBox';
    box.style.cssText='display:flex;align-items:center;gap:10px;margin:0 0 14px;padding:12px 14px;border:1.5px solid #2f2925;border-radius:14px;background:rgba(255,255,255,.72);box-sizing:border-box;';
    box.innerHTML='<span style="font-size:22px;line-height:1">⌕</span><input id="liveAdminProductSearch" type="search" placeholder="Ürün ara... (örn. öğrenci dürüm, pilav, ayran)" autocomplete="off" style="flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;font-size:16px;color:#2f2925;"><button type="button" id="liveAdminSearchClear" style="display:none;border:0;background:transparent;font-size:24px;cursor:pointer;color:#6d5b52">×</button>';
    var heading=panel.querySelector('.admin-products-head');
    if(heading && heading.parentNode) heading.parentNode.insertBefore(box,heading.nextSibling); else panel.insertBefore(box,list);
    var input=document.getElementById('liveAdminProductSearch'), clear=document.getElementById('liveAdminSearchClear');
    function filter(){
      var q=(input.value||'').trim().toLocaleLowerCase('tr-TR');
      var items=list.querySelectorAll('.item'); var shown=0;
      items.forEach(function(item){var ok=!q || item.textContent.toLocaleLowerCase('tr-TR').indexOf(q)!==-1;item.style.display=ok?'':'none';if(ok)shown++;});
      clear.style.display=q?'block':'none';
      var count=document.getElementById('liveAdminSearchCount');
      if(!count){count=document.createElement('div');count.id='liveAdminSearchCount';count.style.cssText='font-size:13px;color:#766b64;margin:-6px 0 12px';box.parentNode.insertBefore(count,box.nextSibling);}
      count.textContent=q?(shown+' ürün bulundu'):(items.length+' ürün');
    }
    input.addEventListener('input',filter); clear.addEventListener('click',function(){input.value='';input.focus();filter();});
    filter();
  }
  function watch(){installProductSearch();var obs=new MutationObserver(function(){installProductSearch();});obs.observe(document.documentElement,{childList:true,subtree:true});}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',watch); else watch();
})();
