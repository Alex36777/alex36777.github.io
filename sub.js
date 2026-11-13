/* Предложение подписаться на группу ВК: блок перед подвалом + ненавязчивое окошко после прочтения. */
(function () {
  "use strict";
  if (window.__nvpSub) return; window.__nvpSub = 1;
  var GID = 242138041, URL = "https://vk.com/club" + GID, DZ = "https://dzen.ru/id/6ac51b68ff198c5f7a5f1dab";
  var ART = /^\/st\//.test(location.pathname);
  function st(t){return {g:function(k){try{return t.getItem(k)}catch(e){return null}},s:function(k,v){try{t.setItem(k,v)}catch(e){}}}}
  var LS = st(window.localStorage), SS = st(window.sessionStorage);
  function goal(g){try{if(window.ym)window.ym(114022016,"reachGoal",g)}catch(e){}}
  var done = LS.g("nvp_sub_done") === "1";

  var css = '\
.vs-box{max-width:1100px;margin:32px auto;padding:22px 24px;border:1px solid var(--line,#22304D);border-radius:20px;background:var(--card,#0F192E);color:var(--ink,#EEF2FA);display:flex;gap:18px;align-items:center;flex-wrap:wrap;font-family:var(--f-body,system-ui,sans-serif)}\
.vs-wrap{padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}\
.vs-txt{flex:1 1 260px;min-width:0}\
.vs-txt b{display:block;font:400 22px/1.2 var(--f-display,Georgia,serif);margin-bottom:6px}\
.vs-txt span{color:var(--muted,#97A3BC);font-size:15px;line-height:1.45}\
.vs-act{flex:0 1 320px;min-width:0;display:flex;flex-direction:column;gap:8px;align-items:stretch}\
.vs-btn{display:flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 20px;border-radius:12px;background:#0077FF;color:#fff!important;text-decoration:none;font:600 16px/1 var(--f-body,system-ui,sans-serif);border:0;cursor:pointer}\
.vs-btn:hover{background:#0069E0}\
.vs-btn svg{width:22px;height:22px;flex:none}\
.vs-w{min-height:0}\
.vs-pop{position:fixed;left:calc(16px + env(safe-area-inset-left,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:62;width:min(340px,calc(100vw - 112px));padding:18px 18px 16px;border-radius:18px;background:var(--card,#0F192E);color:var(--ink,#EEF2FA);border:1px solid var(--lamp,#E9B84E);box-shadow:0 18px 50px rgba(0,0,0,.45);font-family:var(--f-body,system-ui,sans-serif);animation:vs-in .35s ease-out}\
.vs-pop b{display:block;font:400 19px/1.25 var(--f-display,Georgia,serif);margin:0 26px 6px 0}\
.vs-pop p{margin:0 0 12px;color:var(--muted,#97A3BC);font-size:14px;line-height:1.45}\
.vs-x{position:absolute;top:8px;right:8px;width:34px;height:34px;border-radius:50%;border:0;background:transparent;color:var(--muted,#97A3BC);font-size:20px;cursor:pointer}\
.vs-x:hover{color:var(--ink,#EEF2FA)}\
.vs-later{display:block;margin:8px auto 0;border:0;background:none;color:var(--muted,#97A3BC);font-size:13px;cursor:pointer;text-decoration:underline}\
@keyframes vs-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}\
@media (max-width:520px){.vs-pop{left:calc(12px + env(safe-area-inset-left,0px));right:calc(84px + env(safe-area-inset-right,0px));width:auto;bottom:calc(12px + env(safe-area-inset-bottom,0px))}}\
@media (prefers-reduced-motion:reduce){.vs-pop{animation:none}}\
.vs-dzb{display:flex;align-items:center;justify-content:center;gap:8px;height:46px;padding:0 20px;border-radius:12px;background:#E9B84E;color:#1A1208!important;text-decoration:none;font:600 16px/1 var(--f-body,system-ui,sans-serif)}\
.vs-dzb:hover{filter:brightness(1.07)}\
.vs-dz{position:fixed;left:calc(16px + env(safe-area-inset-left,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:61;display:flex;align-items:center;gap:2px;border-radius:999px;background:var(--card,#0F192E);border:1px solid var(--lamp,#E9B84E);box-shadow:0 10px 30px rgba(0,0,0,.35);font-family:var(--f-body,system-ui,sans-serif);transform:translateY(140%);transition:transform .35s ease}\
.vs-dz.on{transform:none}\
.vs-dz a{display:flex;align-items:center;gap:8px;padding:11px 6px 11px 16px;color:var(--ink,#EEF2FA);text-decoration:none;font-weight:600;font-size:15px;white-space:nowrap}\
.vs-dz a i{width:22px;height:22px;border-radius:50%;background:#E9B84E;color:#1A1208;display:grid;place-items:center;font-style:normal;font-size:14px}\
.vs-dz button{width:34px;height:34px;margin-right:4px;border:0;border-radius:50%;background:transparent;color:var(--muted,#97A3BC);font-size:18px;cursor:pointer}\
@media (prefers-reduced-motion:reduce){.vs-dz{transition:none}}';
  var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);

  var VKI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.8 17.3c-5.5 0-8.6-3.8-8.8-10h2.8c.1 4.6 2.1 6.5 3.7 6.9V7.3h2.6v3.9c1.6-.2 3.3-2 3.8-3.9h2.6c-.4 2.4-2.2 4.2-3.4 4.9 1.2.6 3.2 2.1 3.9 5.1h-2.9c-.6-2-2.2-3.5-4-3.7v3.7h-.3z"/></svg>';
  function btn(where){
    var a = document.createElement("a");
    a.className = "vs-btn"; a.href = URL; a.target = "_blank"; a.rel = "noopener";
    a.innerHTML = VKI + "Подписаться в ВКонтакте";
    a.addEventListener("click", function(){ goal("sub_click"); goal("sub_click_" + where); LS.s("nvp_sub_done","1"); closePop(); });
    return a;
  }

  /* Официальный виджет ВК (одна кнопка, если человек уже вошёл в ВК). Если не загрузится — остаётся обычная кнопка. */
  var vkReady = null;
  function vk(){
    if (vkReady) return vkReady;
    vkReady = new Promise(function(res, rej){
      if (window.VK && VK.Widgets) return res();
      var sc = document.createElement("script"); sc.src = "https://vk.com/js/api/openapi.js?169"; sc.async = true;
      sc.onload = function(){ window.VK && VK.Widgets ? res() : rej(); }; sc.onerror = rej;
      document.head.appendChild(sc); setTimeout(rej, 6000);
    });
    vkReady.then(function(){
      try { VK.Observer.subscribe("widgets.groups.joined", function(){ goal("sub_join"); LS.s("nvp_sub_done","1"); setTimeout(closePop, 1200); }); } catch(e){}
    }, function(){});
    return vkReady;
  }
  var wn = 0;
  function widget(host, fallback){
    var id = "vk_sub_" + (++wn), d = document.createElement("div"); d.id = id; d.className = "vs-w"; host.appendChild(d);
    vk().then(function(){
      try { VK.Widgets.Group(id, {mode: 3, width: "auto", no_cover: 1}, GID); if (fallback) fallback.style.display = "none"; } catch(e){}
    }, function(){});
  }

  /* 1. Постоянный блок перед подвалом */
  function box(){
    var foot = document.querySelector("footer"); if (!foot || document.getElementById("grid")) return; // на главной свой блок подписки
    var w = document.createElement("div"); w.className = "vs-wrap";
    w.innerHTML = '<section class="vs-box" aria-label="Подписка"><div class="vs-txt"><b>Новые находки каждый день</b><span>Подпишитесь на «Не все так просто!» в Дзене или во ВКонтакте: археология, тайны истории и космос прямо в вашей ленте.</span></div><div class="vs-act"></div></section>';
    var act = w.querySelector(".vs-act"), b = btn("box");
    var dzb = document.createElement("a"); dzb.className = "vs-dzb"; dzb.href = DZ; dzb.target = "_blank"; dzb.rel = "noopener"; dzb.textContent = "Подписаться в Дзене";
    dzb.addEventListener("click", function(){ goal("dz_sub_box"); });
    act.appendChild(dzb); act.appendChild(b);
    foot.parentNode.insertBefore(w, foot);
    // виджет подгружаем, только когда блок рядом с экраном
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function(es){ if (es[0].isIntersecting){ io.disconnect(); if (!done) widget(act, b); } }, {rootMargin: "300px"});
      io.observe(w);
    }
  }

  /* 2. Окошко: один раз, после прочтения, не чаще раза в 5 дней */
  var pop = null;
  function closePop(later){
    if (!pop) return; pop.remove(); pop = null;
    if (later) LS.s("nvp_sub_ts", String(Date.now()));
  }
  function showPop(){
    if (pop || done || LS.g("nvp_sub_done") === "1" || SS.g("nvp_sub_shown")) return;
    var ts = +LS.g("nvp_sub_ts") || 0; if (Date.now() - ts < 5 * 864e5) return;
    var ar = document.querySelector(".ar-panel"); if (ar && !ar.hidden) return; // не мешаем Архи
    SS.s("nvp_sub_shown", "1"); goal("sub_show");
    pop = document.createElement("div"); pop.className = "vs-pop"; pop.setAttribute("role", "dialog"); pop.setAttribute("aria-label", "Подписка ВКонтакте");
    pop.innerHTML = '<button class="vs-x" type="button" aria-label="Закрыть">×</button><b>' + (ART ? "Понравилась история?" : "Любите такие находки?") + '</b><p>Подпишитесь в ВКонтакте, и новые истории будут сами появляться в вашей ленте.</p>';
    var b = btn("pop"); pop.appendChild(b);
    var later = document.createElement("button"); later.className = "vs-later"; later.type = "button"; later.textContent = "Не сейчас";
    pop.appendChild(later);
    pop.querySelector(".vs-x").addEventListener("click", function(){ closePop(true); });
    later.addEventListener("click", function(){ closePop(true); });
    document.body.appendChild(pop);
    widget(pop, b);
    // виджет вставляется над кнопкой «Не сейчас»
    var w = pop.querySelector(".vs-w"); if (w) pop.insertBefore(w, later);
  }
  function arm(){
    if (done) return;
    var fired = false;
    function fire(){ if (fired) return; fired = true; removeEventListener("scroll", onS); showPop(); }
    function onS(){
      var h = document.documentElement, p = (scrollY + innerHeight) / h.scrollHeight;
      if (p > (ART ? 0.7 : 0.55) && scrollY > 600) fire();
    }
    addEventListener("scroll", onS, {passive: true});
    setTimeout(fire, ART ? 45000 : 60000);
  }

  function pin(){
    if (LS.g("nvp_dz_hide") === "1" || LS.g("nvp_dz_done") === "1") return;
    var d = document.createElement("div"); d.className = "vs-dz";
    d.innerHTML = '<a href="' + DZ + '" target="_blank" rel="noopener"><i aria-hidden="true">+</i>Подписаться в Дзене</a><button type="button" aria-label="Скрыть">×</button>';
    d.querySelector("a").addEventListener("click", function(){ goal("dz_sub_pin"); LS.s("nvp_dz_done","1"); setTimeout(function(){ d.remove(); }, 400); });
    d.querySelector("button").addEventListener("click", function(){ LS.s("nvp_dz_hide","1"); d.remove(); });
    document.body.appendChild(d);
    function chk(){ d.classList.toggle("on", scrollY > 500); }
    addEventListener("scroll", chk, {passive: true}); chk();
  }
  function init(){ box(); pin(); } // всплывающее окно отключено по просьбе владельца
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
