# OInstagram

Site estático de apresentação e catálogo para modelos editáveis no Canva.

## Publicar no GitHub Pages

1. Envie os arquivos deste projeto para um repositório GitHub na branch `main` ou `master`.
2. Em **Settings → Pages**, escolha **GitHub Actions** como fonte de publicação.
3. O workflow em `.github/workflows/deploy-pages.yml` publicará o site a cada envio para a branch.
4. Após a primeira execução concluída, o endereço público aparece em **Settings → Pages** e na execução do workflow.

O catálogo e os modais funcionam no navegador, mas cadastro/login e pagamento ainda são demonstrações: não há backend, autenticação ou gateway de pagamento conectado.
