ENTREGADOR PREMIUM - PWA

ARQUIVOS:
- index.html
- manifest.json
- service-worker.js
- offline.html
- icon-192.png
- icon-512.png

COMO PUBLICAR NO GITHUB PAGES:
1. Crie um repositório ou abra o repositório atual.
2. Envie todos estes arquivos para a raiz, sem colocar dentro de outra pasta.
3. Vá em Settings > Pages.
4. Em Source, selecione Deploy from a branch.
5. Selecione a branch main e a pasta /(root).
6. Salve e abra o endereço HTTPS gerado.
7. No Chrome do Android, abra o site e toque em "Instalar aplicativo".

IMPORTANTE:
- PWA só instala corretamente em HTTPS ou localhost.
- O Firebase precisa continuar com Authentication por Email/Senha ativado.
- As regras do Realtime Database devem permitir somente os acessos autorizados.
- Quando alterar o aplicativo, troque CACHE_NAME em service-worker.js, por exemplo:
  entregador-premium-v2
