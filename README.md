Testando a POC:

Com tudo configurado (npm install, docker ligado) vc escolhe o auth nos middlewares do routes e então você pode testar cada método de autenticação:

Basic Auth: Teste enviando Authorization: Basic <base64-encoded-credentials> no cabeçalho.

JWT: Teste enviando Authorization: Bearer <token> no cabeçalho.

API Key: Teste enviando x-api-key: <your-api-key> no cabeçalho.

OAuth2: Pendente a implementação.

Para rodar:
docker-compose up --build
