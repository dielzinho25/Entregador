const CACHE_NAME = "entregador-premium-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./offline.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(
        chaves.filter(chave => chave !== CACHE_NAME).map(chave => caches.delete(chave))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const requisicao = event.request;
  const url = new URL(requisicao.url);

  if (requisicao.method !== "GET") return;

  // Firebase e APIs precisam da rede para dados atualizados.
  if (
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("gstatic.com")
  ) {
    event.respondWith(fetch(requisicao).catch(() => caches.match(requisicao)));
    return;
  }

  // Navegação: tenta rede e usa a página salva quando estiver offline.
  if (requisicao.mode === "navigate") {
    event.respondWith(
      fetch(requisicao)
        .then(resposta => {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then(cache => cache.put("./index.html", copia));
          return resposta;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./offline.html")))
    );
    return;
  }

  // Arquivos locais: cache primeiro.
  event.respondWith(
    caches.match(requisicao).then(cache => {
      return cache || fetch(requisicao).then(resposta => {
        if (resposta && resposta.status === 200 && resposta.type === "basic") {
          const copia = resposta.clone();
          caches.open(CACHE_NAME).then(c => c.put(requisicao, copia));
        }
        return resposta;
      });
    })
  );
});
