<h1 align="center">
  <img alt="Daily Diet API" title="Daily Diet API" src="https://raw.githubusercontent.com/tavareshenrique/03-ignite-nodejs-find-friend-api/refs/heads/main/assets/logo.png" width="250px" />
</h1>

<p align="center">
  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/tavareshenrique/03-ignite-nodejs-find-friend-api?color=69333c">
  <img alt="Made by Henrique Tavares" src="https://img.shields.io/badge/made%20by-Henrique Tavares-%20?color=69333c">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/tavareshenrique/03-ignite-nodejs-find-friend-api?color=69333c">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tavareshenrique/03-ignite-nodejs-find-friend-api?color=69333c">
  <img alt="GitHub license" src="https://img.shields.io/github/license/tavareshenrique/03-ignite-nodejs-find-friend-api?color=69333c">
</p>

<p align="center">
  <a href="#information_source-como-executar">ℹ️ Como Executar?</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">🚀 Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-autores">💻 Autores</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">📝 Licença</a>
</p>

<p align="center">
  O <b>Find a Friend API</b> é o desafio do <b>terceiro módulo</b> do curso  <b>Ignite NodeJS da Rocketseat</b>. Para acessar o código do curso do <b>Ignite NodeJS</b>, <a href="https://github.com/tavareshenrique/ignite-nodejs">clique aqui</a> .
</p>

<p align="center">
  O Projeto consiste em uma API para encontrar amigo pet, onde é possível cadastrar uma ONG, e cadastrar os Pets que estão disponíveis para adoção. Também é possível fazer o filtro de Pets por cidade, estado, raça, idade etc.
</p>


<p align="center">
  <a href="https://insomnia.rest/run/?label=Find%20a%20Friend%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftavareshenrique%2F03-ignite-nodejs-find-friend-api%2Frefs%2Fheads%2Fmain%2Fassets%2FInsomnia_2025-02-01.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

</p>

---

# :information_source: Como Executar?

> **1.0.** Clone o Repositório:

```bash
git clone https://github.com/tavareshenrique/03-ignite-nodejs-find-friend-api.git
```

> **1.1.** Instale as dependências:

```bash
pnpm install
```

> **1.2.** Crie a .env a partir da .env.example

```bash
cp .env.example .env
```


> **1.3.** Inicie o Banco de Dados com Docker:

```bash
docker-compose up --build
# A flag "--build" só é usado na primeira vez que for subir o banco de dados.

# Deixe rodando em um terminal e abra outro terminal para rodar os próximos comandos.
```

> **1.4.** Rode as Migrations:

```bash
npx prisma migrate dev
```

> **1.5.** Gere os types a partir do prisma:

```bash
npx prisma generate
```

> **1.6.** Inicie o Serviço:

```bash
pnpm dev
```

> ➡️ Use [http://localhost:3333](http://localhost:3333) para acessar a aplicação.


# :rocket: Tecnologias

- [Fastify](https://fastify.dev/)
- [@fastify/cookie](https://github.com/fastify/fastify-cookie)
- [@fastify/jwt](https://github.com/fastify/fastify-jwt)
- [@fastify/multipart](https://github.com/fastify/fastify-multipart)
- [@fastify/static](https://github.com/fastify/fastify-static)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Postgres](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [tsx](https://github.com/esbuild-kit/tsx)
- [tsup](https://github.com/egoist/tsup)
- [supertest](https://github.com/ladjs/supertest)
- [vitest](https://vitest.dev/)
- [zod](https://zod.dev/)

# :computer: Autores

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/tavareshenrique/">
        <img src="https://avatars1.githubusercontent.com/u/27022914?v=4" width="100px;" alt="Henrique Tavares"/>
        <br />
        <sub>
          <b>Henrique Tavares</b>
        </sub>
       </a>
       <br />
       <a href="https://www.linkedin.com/in/tavareshenrique/" title="Linkedin">@tavareshenrique</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Code">💻</a>
    </td>
    <td align="center">
      <a href="http://github.com/rocketseat/">
        <img src="https://avatars.githubusercontent.com/u/28929274?s=200&v=4" width="100px;" alt="Logo da Rocketseat"/>
        <br />
        <sub>
          <b>Rocketseat</b>
        </sub>
       </a>
       <br />
       <a href="http://github.com/rocketseat/" title="Linkedin">@rocketseat</a>
       <br />
       <a href="https://github.com/tavareshenrique/go-barber-web-ts/commits?author=tavareshenrique" title="Education Platform">🚀</a>
    </td>
  </tr>
</table>

# :memo: Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo de [licença](./LICENSE) para mais detalhes.
