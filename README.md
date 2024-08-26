Testando a POC
Com tudo configurado vc escolhe o auth no middleware do routes e então você pode testar cada método de autenticação:

Basic Auth: Teste enviando Authorization: Basic <base64-encoded-credentials> no cabeçalho.
JWT: Teste enviando Authorization: Bearer <token> no cabeçalho.
OAuth2: Acesse /auth/google e siga o fluxo de autenticação.
API Key: Teste enviando x-api-key: <your-api-key> no cabeçalho.

Para rodar a POC
docker-compose up --build
