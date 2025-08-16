# Gym Notes API
> API RESTful para gerenciamento de treinos, exercícios e autenticação de usuários. Desenvolvida com Node.js, Express e MongoDB. Conta com autenticação via JWT e Google OAuth, validações, proteção de rotas, documentação usando Swagger e deploy contínuo no Render.

---

## Funcionalidades

### Autenticação
* Registro de usuário com nome, e-mail e senha (criptografada com bcrypt).
* Login via JWT com expiração configurável.
* Login com Google OAuth integrado via Passport.js.

### Exercícios (CRUD)
* Criação, leitura, atualização (completo ou parcial) e exclusão de exercícios.
* Validação de input com ``express-validator``.
* Proteção de rotas com middleware ``protect`` (somente usuários autenticados).

### Treinos (Workout) (CRUD)
* Modelo com ``core``, ``coreTwo``, ``startTime`` e ``endTime``.
* Validação e suporte a atualização parcial (PATCH).
* Associação de Treinos e Exercícios (WorkoutExercise)
* Relacionamento entre treino e vários exercícios (com ``sets``, ``reps``, ``weight``, ``unitWeight``).

### CRUD completo e rotas protegidas.
* Segurança e Middleware
* CORS configurável por variável de ambiente (desenvolvimento e produção).
* Rate limiting com ``express-rate-limit``, adaptado para produção no Render (``trust proxy``)
* Logger para registrar eventos de operações importantes.

### Documentação (Swagger)
* Documentação automática via Swagger UI.
* Acesse em: [docs da API](https://api-gymnotes.onrender.com/api-docs)

Deploy
* Hospedado no Render, com deploy automático a cada push no GitHub.
* Configuração zero-touch para ``npm install`` e ``npm start``.
* Escalável e configurável via variáveis de ambiente no painel.

---

## Tecnologias
* Node.js + ES Modules
* Express.js
* MongoDB com Mongoose
* JWT (jsonwebtoken)
* OAuth via Google (passport-google-oauth20)
* Validação com express-validator
* Segurança: helmet, cors, express-rate-limit
* Documentação com swagger-jsdoc + swagger-ui-express
* Deploy: Render.com, MongoDB Atlas

---

## Instalação local

1. Clone o repositório:
```bash
git clone https://github.com/gabriel-florentino/api-gymnotes.git
cd api-gymnotes
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um .env com as variáveis:
```bash
PORT=3000
MONGO_URI=seu_mongodb_atlas
JWT_SECRET=sua_chave_secreta
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
CORS_ORIGIN=http://localhost:3000
```

4. Inicie a API:
```bash
npm start
```

5. Acesse:
```bash
API base: http://localhost:3000/

Swagger UI: http://localhost:3000/api-docs
```

---

## Testes no Postman
Coleção de endpoints disponíveis no [docs/Postman_collection.json](docs/postman_collection.json)
Testes no Postman

| Método                | Rota             | Descrição                  |
| --------------------- | ---------------- | -------------------------- |
| POST                  | `/auth/register` | Registro de usuário        |
| POST                  | `/auth/login`    | Login com e-mail e senha   |
| GET                   | `/auth/google`   | Login via Google (browser) |
| POST                  | `/exercises`     | Criar exercício            |
| GET                   | `/exercises`     | Listar exercícios          |
| GET                   | `/exercises/:id` | Obter exercício único      |
| PUT                   | `/exercises/:id` | Atualização completa       |
| PATCH                 | `/exercises/:id` | Atualização parcial        |
| DELETE                | `/exercises/:id` | Deletar exercício          |
| POST                  | `/workout`       | Criar treino               |
| GET                   | `/workout`       | Listar treino              |
| GET                   | `/workout/:id`   | Obter treino único         |
| PUT                   | `/workout/:id`   | Atualização completa       |
| PATCH                 | `/workout/:id`   | Atualização parcial        |
| DELETE                | `/workout/:id`   | Deletar treino             |
| POST                  | `/go-workout`    | Criar treino completo      |
| GET                   | `/go-workou`     | Listar treino completo     |
| GET                   | `/go-workou/:id` | Obter treino completo único|
| PUT                   | `/go-workou/:id` | Atualização completa       |
| PATCH                 | `/go-workou/:id` | Atualização parcial        |
| DELETE                | `/go-workou/:id` | Deletar treino completo    |

**Atenção: Inclua o token JWT no header:**
```bash
Authorization: Bearer <seu_token>
```