/* Архи — совёнок-помощник сайта «Не все так просто!». Работает без сервера: ищет по статьям архива прямо в браузере. */
(function () {
  "use strict";
  if (window.__archi) return; window.__archi = 1;

  var CATS = {arch:"Археология",under:"Подземелья и пещеры",egypt:"Египет",sea:"Море и корабли",history:"История",museum:"Музеи и шедевры",space:"Космос",mystery:"Загадки",misc:"Разное"};
  var EMO = {arch:"🏺",under:"🕯️",egypt:"🔺",sea:"⚓",history:"📜",museum:"🖼️",space:"🪐",mystery:"🔍",misc:"✨"};
  var VK = "https://vk.com/club242138041";
  var HOME = location.pathname === "/" || location.pathname === "/index.html";
  function store(t) { return {get:function(k){try{return t.getItem(k)}catch(e){return null}}, set:function(k,v){try{t.setItem(k,v)}catch(e){}}}; }
  var LS = store(window.localStorage), SS = store(window.sessionStorage);
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }
  function goal(g) { try { if (window.ym) window.ym(114022016, "reachGoal", g); } catch (e) {} }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  var REDUCED = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  var CSS = '\
.ar-btn{position:fixed;right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:60;width:60px;height:60px;border-radius:50%;border:1.5px solid var(--lamp,#E9B84E);background:radial-gradient(circle at 35% 30%,var(--card-hi,#15223D),var(--card,#0F192E));box-shadow:0 10px 30px rgba(0,0,0,.45),0 0 0 6px var(--lamp-soft,rgba(233,184,78,.16));cursor:pointer;display:grid;place-items:center;padding:0;transition:transform .2s}\
.ar-btn:hover{transform:scale(1.07)}\
.ar-face{display:block;font-size:32px;line-height:1;animation:ar-bob 3.4s ease-in-out infinite;transform-origin:50% 90%}\
.ar-btn[aria-expanded="true"] .ar-face{animation:none}\
@keyframes ar-bob{0%,100%{transform:translateY(0) rotate(0)}40%{transform:translateY(-3px) rotate(-8deg)}60%{transform:translateY(-3px) rotate(8deg)}}\
.ar-dot{position:absolute;top:3px;right:3px;width:13px;height:13px;border-radius:50%;background:#FF5D5D;border:2px solid var(--card,#0F192E)}\
.ar-tip{position:fixed;right:calc(88px + env(safe-area-inset-right,0px));bottom:calc(28px + env(safe-area-inset-bottom,0px));z-index:60;max-width:min(260px,calc(100vw - 120px));background:var(--card,#0F192E);color:var(--ink,#EEF2FA);border:1px solid var(--lamp,#E9B84E);border-radius:16px 16px 4px 16px;padding:10px 30px 10px 12px;font:500 14px/1.4 var(--f-body,system-ui,sans-serif);box-shadow:0 10px 30px rgba(0,0,0,.35);cursor:pointer;animation:ar-in .3s ease-out}\
.ar-tip-x{position:absolute;top:3px;right:4px;border:0;background:none;color:var(--muted,#97A3BC);font-size:17px;line-height:1;cursor:pointer;padding:4px 6px}\
@keyframes ar-in{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}\
.ar-panel{position:fixed;right:calc(16px + env(safe-area-inset-right,0px));bottom:calc(88px + env(safe-area-inset-bottom,0px));z-index:61;width:min(380px,calc(100vw - 32px));height:min(560px,calc(100vh - 120px));height:min(560px,calc(100dvh - 120px));display:flex;flex-direction:column;background:var(--card,#0F192E);color:var(--ink,#EEF2FA);border:1px solid var(--line,#22304D);border-radius:20px;box-shadow:0 24px 60px rgba(0,0,0,.5);overflow:hidden;font-family:var(--f-body,system-ui,sans-serif);animation:ar-in .25s ease-out}\
.ar-head{display:flex;align-items:center;gap:10px;padding:12px 12px 12px 14px;border-bottom:1px solid var(--line,#22304D);background:var(--card-hi,#15223D);flex:none}\
.ar-av{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:25px;background:var(--lamp-soft,rgba(233,184,78,.16));border:1px solid var(--lamp,#E9B84E);flex:none;transition:transform .3s}\
.ar-av.think{transform:rotate(-12deg)}\
.ar-name{font:400 19px/1.1 var(--f-display,Georgia,serif)}\
.ar-sub{font-size:12px;color:var(--muted,#97A3BC);margin-top:3px}\
.ar-close{margin-left:auto;width:36px;height:36px;flex:none;border-radius:50%;border:1px solid var(--line,#22304D);background:transparent;color:var(--ink,#EEF2FA);font-size:17px;cursor:pointer}\
.ar-close:hover{border-color:var(--lamp,#E9B84E)}\
.ar-log{flex:1;min-height:0;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;overscroll-behavior:contain}\
.ar-m{max-width:90%;padding:9px 12px;border-radius:16px;font-size:14.5px;line-height:1.45;overflow-wrap:anywhere}\
.ar-b{align-self:flex-start;background:var(--card-hi,#15223D);border:1px solid var(--line,#22304D);border-bottom-left-radius:4px}\
.ar-u{align-self:flex-end;background:var(--lamp,#E9B84E);color:var(--bg,#060A15);border-bottom-right-radius:4px;font-weight:500}\
.ar-m a{color:var(--lamp,#E9B84E)}\
.ar-m p{margin:0}.ar-m p+p{margin-top:6px}\
a.ar-card{display:block;margin-top:8px;padding:9px 10px;border-radius:12px;background:var(--card,#0F192E);border:1px solid var(--line,#22304D);border-left:3px solid var(--c,var(--lamp,#E9B84E));text-decoration:none;color:var(--ink,#EEF2FA)}\
a.ar-card:hover{border-color:var(--c,var(--lamp,#E9B84E))}\
.ar-card i{display:block;font-style:normal;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--c,var(--lamp,#E9B84E));margin-bottom:3px}\
.ar-card b{display:block;font-weight:600;font-size:14px;line-height:1.3}\
.ar-card span{display:block;color:var(--muted,#97A3BC);font-size:12.5px;line-height:1.4;margin-top:4px}\
.ar-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}\
.ar-links a{border:1px solid var(--line,#22304D);border-radius:999px;padding:6px 10px;text-decoration:none;font-size:13px;color:var(--ink,#EEF2FA)}\
.ar-links a:hover{border-color:var(--lamp,#E9B84E)}\
.ar-typing{display:flex;gap:4px;align-items:center;height:20px}\
.ar-typing span{width:6px;height:6px;border-radius:50%;background:var(--muted,#97A3BC);animation:ar-d 1s infinite}\
.ar-typing span:nth-child(2){animation-delay:.15s}.ar-typing span:nth-child(3){animation-delay:.3s}\
@keyframes ar-d{0%,80%,100%{opacity:.3;transform:none}40%{opacity:1;transform:translateY(-3px)}}\
.ar-chips{display:flex;gap:6px;overflow-x:auto;padding:8px 12px 4px;scrollbar-width:none;flex:none}\
.ar-chips::-webkit-scrollbar{display:none}\
.ar-chip{flex:none;border:1px solid var(--line,#22304D);background:transparent;color:var(--ink,#EEF2FA);border-radius:999px;padding:8px 11px;font:500 13px/1 var(--f-body,system-ui,sans-serif);cursor:pointer;white-space:nowrap}\
.ar-chip:hover{border-color:var(--lamp,#E9B84E);color:var(--lamp,#E9B84E)}\
.ar-form{display:flex;gap:8px;padding:8px 12px 12px;flex:none}\
.ar-in{flex:1;min-width:0;border:1px solid var(--line,#22304D);background:var(--bg,#060A15);color:var(--ink,#EEF2FA);border-radius:999px;padding:10px 14px;font:16px/1.2 var(--f-body,system-ui,sans-serif);outline:none}\
.ar-in:focus{border-color:var(--lamp,#E9B84E)}\
.ar-send{width:44px;height:44px;flex:none;border-radius:50%;border:0;background:var(--lamp,#E9B84E);color:var(--bg,#060A15);font-size:19px;font-weight:700;cursor:pointer}\
.totop{bottom:calc(88px + env(safe-area-inset-bottom,0px))!important}\
@media (max-width:480px){.ar-panel{bottom:calc(84px + env(safe-area-inset-bottom,0px));height:calc(100vh - 110px);height:calc(100dvh - 110px)}}\
@media (prefers-reduced-motion:reduce){.ar-face,.ar-tip,.ar-panel,.ar-typing span{animation:none}}';

  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);

  var btn = document.createElement("button");
  btn.type = "button"; btn.className = "ar-btn";
  btn.setAttribute("aria-label", "Помощник Архи: спросить про находки");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = '<span class="ar-face" aria-hidden="true">🦉</span>' + (LS.get("nvp_archi") ? "" : '<span class="ar-dot" aria-hidden="true"></span>');
  document.body.appendChild(btn);

  /* ---------- данные ---------- */
  var DATA = null, DOCS = null, loading = null;
  function norm(s) { return String(s).toLowerCase().replace(/ё/g, "е").replace(/[^a-zа-я0-9]+/g, " ").trim(); }
  function words(s) { var n = norm(s); return n ? n.split(" ") : []; }
  function load() {
    if (loading) return loading;
    loading = Promise.all([
      fetch("/st/idx.json").then(function (r) { return r.json(); }),
      fetch("/st/texts.json").then(function (r) { return r.json(); }).catch(function () { return {}; })
    ]).then(function (res) {
      DATA = res[0]; var TX = res[1] || {};
      DOCS = DATA.a.map(function (d) {
        var p = (TX[d.u] && TX[d.u].p) || [];
        return {d: d, tw: words(d.t), cw: words(CATS[d.c] || ""), p: p, pw: p.map(words)};
      });
    });
    return loading;
  }
  function link(d) { return d.s ? "/st/" + d.s + "/" : "https://dzen.ru/a/" + d.u; }

  /* ---------- поиск ---------- */
  var STOP = {};
  ("и в во на по с со к ко о об от до из за для про как что это эта этот эти кто где когда почему зачем ли же бы не ни а но или у я ты мы вы он она они его ее их мне тебе нам расскажи расскажите покажи найди найти есть был была были было какой какая какие какое самый самая самое там тут все ещё еще очень тоже так такой статья статьи статью статей хочу можно может нибудь чтото что-то либо всё про почитать узнать интересное интересно было").split(" ").forEach(function (w) { STOP[w] = 1; });
  function stem(w) {
    if (w.length <= 3) return w;
    if (w.length === 4) return w.slice(0, 3);
    return w.slice(0, Math.max(4, Math.min(w.length - 2, 7)));
  }
  var SYN = {
    "егип": ["пирамид", "фараон", "мумi", "мумий", "мумия"],
    "пирами": ["египт", "фараон"],
    "космо": ["планет", "марс", "лун", "звезд", "астероид", "орбит"],
    "косм": ["планет", "марс", "лун", "звезд"],
    "мор": ["корабл", "затонул", "подводн", "дно"],
    "корабл": ["затонул", "судн", "шторм"],
    "пещер": ["подзем", "грот"],
    "подзем": ["пещер", "тоннел", "катакомб"],
    "викин": ["скандинав", "норман"],
    "рим": ["римск", "легион", "импер"],
    "римск": ["рим", "легион"],
    "мамон": ["ледников", "палеолит"],
    "оруж": ["меч", "копь", "клинок"],
    "золо": ["клад", "сокровищ"],
    "клад": ["золот", "сокровищ", "монет"]
  };
  function search(q) {
    var qs = words(q).filter(function (w) { return !STOP[w] && w.length > 1; }).map(stem);
    if (!qs.length) return [];
    var terms = qs.map(function (s) { return {s: s, w: 1}; });
    qs.forEach(function (s) { (SYN[s] || []).forEach(function (x) { terms.push({s: x, w: .5, syn: 1}); }); });
    var out = [];
    DOCS.forEach(function (doc) {
      var score = 0, hit = 0, bestP = -1, bestPS = 0, pScore = doc.p.map(function () { return 0; });
      terms.forEach(function (t) {
        var th = doc.tw.some(function (w) { return w.indexOf(t.s) === 0; });
        var ch = doc.cw.some(function (w) { return w.indexOf(t.s) === 0; });
        var xh = 0;
        doc.pw.forEach(function (pw, i) { var c = 0; pw.forEach(function (w) { if (w.indexOf(t.s) === 0) c++; }); if (c) { pScore[i] += c * t.w; xh += c; } });
        var s = (th ? 3 : 0) + (ch ? 2 : 0) + Math.min(xh, 3) * .6;
        score += s * t.w;
        if (!t.syn && (th || ch || xh)) hit++;
      });
      if (!score) return;
      if (hit === qs.length) score += 2;
      pScore.forEach(function (v, i) { if (v > bestPS) { bestPS = v; bestP = i; } });
      out.push({doc: doc, score: score, snip: bestP >= 0 ? doc.p[bestP] : (doc.p[0] || "")});
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return out.filter(function (r) { return r.score >= 1.5; }).slice(0, 3);
  }
  function cut(s, n) { s = String(s || ""); if (s.length <= n) return s; s = s.slice(0, n); return s.slice(0, s.lastIndexOf(" ")) + "…"; }
  function card(d, snip) {
    return '<a class="ar-card" style="--c:var(--' + d.c + ')" href="' + link(d) + '"><i>' + (EMO[d.c] || "✨") + " " + esc(CATS[d.c] || "") + "</i><b>" + esc(d.t) + "</b>" + (snip ? "<span>" + esc(cut(snip, 170)) + "</span>" : "") + "</a>";
  }
  function randomDoc() { return pick(DOCS); }

  /* ---------- ответы ---------- */
  var FACTS = [
    "на Венере день длиннее года — она поворачивается медленнее, чем облетает Солнце",
    "на Титане идёт метановый дождь, а капли падают медленно, как снежинки",
    "на Нептуне ветер разгоняется до 2100 км/ч — быстрее звука на Земле",
    "в кратере Гейла, где работает Curiosity, ночью бывает около −85°C"
  ];
  function A(n, raw) {
    if (/^(привет|здравств|добр(ый|ое|ой)|хай|хелло|салют|ку|йо)( |$)/.test(n))
      return {h: "<p>Привет-привет! 🦉 Спрашивай про любую находку — я помню все статьи архива.</p>"};
    if (/(кто ты|ты кто|как тебя зовут|как тебя|твое имя|что ты умеешь|что умеешь|помоги|помощь)/.test(n))
      return {h: "<p>Я Архи — совёнок-хранитель архива «Не все так просто!» 🦉</p><p>Напиши слово — например, <b>мамонт</b>, <b>Египет</b>, <b>корабль</b> — и я найду статьи. Ещё могу подкинуть случайную находку, самую древнюю или самую свежую.</p>"};
    if (/(спасибо|благодар|круто|класс|супер|прикольно|клево)/.test(n))
      return {h: "<p>" + pick(["Всегда рад! 🦉", "Ух, приятно! Заходи ещё 🦉", "Угу-угу! Обращайся 🦉"]) + "</p>"};
    if (/(случайн|наугад|удиви|скучно|что почитать|посоветуй|рандом|любую)/.test(n)) return {k: "random"};
    if (/(самая древн|самое древн|самые древн|старейш|самое старое|самая старая|древнее всего)/.test(n)) return {k: "oldest"};
    if (/(что нового|новенькое|последние|свежие|новые статьи|последняя статья|свежее)/.test(n)) return {k: "new"};
    if (/(погод|температур|марс сейчас|время на марсе)/.test(n)) return {k: "wx"};
    if (/(рубрик|раздел|категори|какие темы|о чем канал)/.test(n)) return {k: "cats"};
    if (/(миф|правда или)/.test(n)) return {k: "myth"};
    if (/(^| )(вк|vk|вконтакте|дзен|подписаться|подписка|соцсети)( |$)/.test(n)) return {k: "social"};
    return {k: "search"};
  }
  function reply(kind, raw) {
    var h = "";
    if (kind === "random") {
      var d = randomDoc();
      h = "<p>" + pick(["Тяну из архива наугад… 🎲", "Вот тебе находка наугад:", "Совиная интуиция подсказывает:"]) + "</p>" + card(d.d, d.p[0]);
    } else if (kind === "oldest") {
      var old = DOCS.filter(function (x) { return x.d.a > 0; }).sort(function (a, b) { return b.d.a - a.d.a; }).slice(0, 3);
      h = "<p>Самые древние находки в архиве 🦴</p>" + old.map(function (x) { return card(x.d, "≈ " + Math.round(x.d.a).toLocaleString("ru-RU") + " лет назад"); }).join("");
    } else if (kind === "new") {
      var nw = DOCS.slice().sort(function (a, b) { return a.d.o - b.d.o; }).slice(0, 3);
      h = "<p>Свежее в архиве 🆕</p>" + nw.map(function (x) { return card(x.d, x.p[0]); }).join("");
    } else if (kind === "wx") {
      h = "<p>Знаешь, что " + pick(FACTS) + "? 🪐</p><p>Погода на Марсе и ещё 8 мирах обновляется каждый день:</p><div class=\"ar-links\"><a href=\"/#h-wx\">🌡️ Открыть погоду в Солнечной системе</a></div>";
    } else if (kind === "cats") {
      h = "<p>Вот все рубрики архива:</p><div class=\"ar-links\">" + Object.keys(CATS).map(function (k) { return '<a href="/r/' + k + '/">' + EMO[k] + " " + CATS[k] + "</a>"; }).join("") + "</div>";
    } else if (kind === "myth") {
      h = "<p>Проверь себя в игре «Правда или миф» — угадаешь, где правда? 🤔</p><div class=\"ar-links\"><a href=\"/#h-tm\">🎯 Сыграть</a></div>";
    } else if (kind === "social") {
      h = "<p>Новые находки выходят тут — подписывайся, чтобы не пропустить:</p><div class=\"ar-links\"><a href=\"" + VK + "\" target=\"_blank\" rel=\"noopener\">ВКонтакте</a>" + (DATA.dzen ? '<a href="' + DATA.dzen + '" target="_blank" rel="noopener">Дзен</a>' : "") + "</div>";
    } else {
      var r = search(raw);
      if (r.length) {
        h = "<p>" + pick(["Вот что я откопал 🦉", "Нашёл в архиве!", "Смотри, что есть:", "Угу, про это у нас есть:"]) + "</p>" + r.map(function (x) { return card(x.doc.d, x.snip); }).join("");
        goal("archi_found");
      } else {
        var rd = randomDoc();
        h = "<p>Хм, про «" + esc(cut(raw, 40)) + "» в архиве пока ничего нет 🤔 Попробуй другое слово — например, <b>мамонт</b>, <b>Египет</b> или <b>корабль</b>.</p><p>А пока держи случайную находку:</p>" + card(rd.d, rd.p[0]);
        return {h: h, think: 1};
      }
    }
    return {h: h};
  }

  /* ---------- окно ---------- */
  var panel, log, input, av, tip, busy = false;
  function addMsg(html, who) {
    var m = document.createElement("div");
    m.className = "ar-m " + (who === "u" ? "ar-u" : "ar-b");
    m.innerHTML = html; log.appendChild(m);
    log.scrollTop = log.scrollHeight;
    return m;
  }
  function botSay(fn) {
    busy = true;
    var t = addMsg('<div class="ar-typing" aria-label="Архи печатает"><span></span><span></span><span></span></div>', "b");
    av.classList.add("think");
    Promise.all([load(), new Promise(function (r) { setTimeout(r, REDUCED ? 0 : 550); })]).then(function () {
      var res = fn(); t.innerHTML = res.h;
      av.textContent = res.think ? "🤔" : "🦉";
      if (res.think) setTimeout(function () { av.textContent = "🦉"; }, 2200);
    }).catch(function () {
      t.innerHTML = "<p>Ой, архив не открылся — проверь интернет и попробуй ещё раз 🦉</p>";
    }).then(function () { av.classList.remove("think"); busy = false; log.scrollTop = log.scrollHeight; });
  }
  function ask(text) {
    text = String(text || "").trim(); if (!text || busy) return;
    addMsg("<p>" + esc(text) + "</p>", "u");
    var n = norm(text);
    botSay(function () { var a = A(n, text); return a.h ? {h: a.h} : reply(a.k, text); });
  }
  function chip(kind, label) {
    if (busy) return;
    addMsg("<p>" + esc(label) + "</p>", "u");
    botSay(function () { return reply(kind, label); });
  }
  function build() {
    panel = document.createElement("div");
    panel.className = "ar-panel"; panel.id = "ar-panel";
    panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Помощник Архи");
    panel.innerHTML =
      '<div class="ar-head"><div class="ar-av" aria-hidden="true">🦉</div><div><div class="ar-name">Архи</div><div class="ar-sub">совёнок-хранитель архива</div></div><button class="ar-close" type="button" aria-label="Закрыть">✕</button></div>' +
      '<div class="ar-log" aria-live="polite"></div>' +
      '<div class="ar-chips">' + [["random","🎲 Случайная находка"],["oldest","🦴 Самое древнее"],["new","🆕 Свежее"],["wx","🪐 Погода на Марсе"],["cats","📚 Рубрики"],["myth","🤔 Правда или миф"]].map(function (c) { return '<button class="ar-chip" type="button" data-k="' + c[0] + '">' + c[1] + "</button>"; }).join("") + "</div>" +
      '<form class="ar-form"><input class="ar-in" type="text" maxlength="120" placeholder="Спроси: мамонты, Египет, клад…" aria-label="Вопрос Архи" enterkeyhint="send"><button class="ar-send" type="submit" aria-label="Отправить">➜</button></form>';
    document.body.appendChild(panel);
    log = panel.querySelector(".ar-log"); input = panel.querySelector(".ar-in"); av = panel.querySelector(".ar-av");
    panel.querySelector(".ar-close").addEventListener("click", close);
    panel.querySelector(".ar-form").addEventListener("submit", function (e) { e.preventDefault(); var v = input.value; input.value = ""; ask(v); });
    panel.querySelectorAll(".ar-chip").forEach(function (b) { b.addEventListener("click", function () { chip(b.dataset.k, b.textContent); }); });
    panel.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a");
      if (a && HOME && a.getAttribute("href").indexOf("/#") === 0) close();
    });
    var back = LS.get("nvp_archi");
    addMsg(back
      ? "<p>С возвращением! 🦉 Что раскопаем сегодня?</p>"
      : "<p>Привет! Я <b>Архи</b> 🦉 — совёнок, который охраняет архив «Не все так просто!».</p><p>Спроси меня про любую находку — <b>мамонты</b>, <b>Египет</b>, <b>затонувшие корабли</b>… Или нажми кнопку внизу.</p>", "b");
    load().catch(function () {});
  }
  function open() {
    hideTip(true);
    if (!panel) build(); else panel.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    var dot = btn.querySelector(".ar-dot"); if (dot) dot.remove();
    LS.set("nvp_archi", "1"); goal("archi_open");
    if (matchMedia("(pointer:fine)").matches) setTimeout(function () { input.focus(); }, 50);
  }
  function close() {
    if (panel) panel.hidden = true;
    btn.setAttribute("aria-expanded", "false"); btn.focus({preventScroll: true});
  }
  btn.addEventListener("click", function () { (panel && !panel.hidden) ? close() : open(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel && !panel.hidden) close(); });

  /* ---------- подсказка-облачко ---------- */
  var TIPS = HOME
    ? ["Псст! Хочешь находку, которой 34 000 лет? 🦴", "Угу! Спроси меня про любую находку 🦉", "Скучно? Могу достать случайную находку из архива 🎲"]
    : ["Понравилось? Найду похожие истории 🦉", "Угу! Спроси меня про любую находку 🦉"];
  function hideTip(forever) { if (tip) { tip.remove(); tip = null; } if (forever) SS.set("nvp_archi_tip", "1"); }
  if (!SS.get("nvp_archi_tip")) setTimeout(function () {
    if (SS.get("nvp_archi_tip") || (panel && !panel.hidden)) return;
    tip = document.createElement("div"); tip.className = "ar-tip"; tip.setAttribute("role", "status");
    tip.innerHTML = esc(pick(TIPS)) + '<button class="ar-tip-x" type="button" aria-label="Скрыть">×</button>';
    tip.addEventListener("click", function (e) { if (e.target.classList.contains("ar-tip-x")) { e.stopPropagation(); hideTip(true); } else open(); });
    document.body.appendChild(tip);
    setTimeout(function () { hideTip(true); }, 12000);
  }, 20000);
})();
