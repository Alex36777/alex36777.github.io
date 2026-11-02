const V = "nvp-v1";
const CORE = ["/", "/st/st.css?v=3", "/images/logo-128.jpg", "/lib/d3-array.min.js", "/lib/d3-geo.min.js", "/lib/topojson-client.min.js", "/lib/land-110m.json"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  const cacheFirst = u.origin === location.origin ? /^\/(images|lib)\//.test(u.pathname) : /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (cacheFirst) { e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok || res.type === "opaque") { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; }))); return; }
  if (u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res.ok) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; }).catch(() => caches.match(r).then(m => m || caches.match("/"))));
});
