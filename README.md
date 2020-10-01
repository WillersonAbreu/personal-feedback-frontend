# Personal Feedback Frontend

##### Sobre projeto

O projeto é uma aplicação simples para poder registrar feedbacks para outros usuários cadastrados no sistema.

# Tecnologias utilizadas

- [NodeJs + npm](https://nodejs.org/en/)
- [Create React App](https://create-react-app.dev/docs/getting-started/)

# Instalação

##### Pré requisitos:

- [API Rest da aplicação (Backend)](https://github.com/WillersonAbreu/personal-feedback-api)
- [NodeJs + npm](https://nodejs.org/en/)

Abra o diretório onde você deseja manter o projeto pelo terminal e execute o seguinte comando:

```sh
$ git clone git@github.com:WillersonAbreu/personal-feedback-frontend.git
```

```sh
$ cd personal-feedback-frontend
```

- Copie o conteúdo do arquivo config.js.example que fica dentro de /src/global/shared;
- Crie um novo arquivo chamado config.js dentro do mesmo diretório;
- Cole o conteúdo copiado do primeiro arquivo dentro deste novo arquivo;
- Preencha _GLOBAL_URL_ com as string da URL + Porta onde está rodando a API Rest. Exemplo: http://localhost:3333
- Preencha _JWT_SECRET_ com a mesma string que está sendo utilizada no arquivo .env da API Rest

Para instalar as dependências:

```sh
$ yarn
```

ou

```sh
$ npm install
```

Para rodar em desenvolvimento:

```sh
$ yarn start
```

ou

```sh
$ npm start
```
