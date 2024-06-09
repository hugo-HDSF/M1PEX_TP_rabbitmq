<p align="center">
  <a><img src="https://www.rabbitmq.com//img/rabbitmq-logo-with-name.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1 align="center">test <a href="https://www.rabbitmq.com">RabbitMQ</a></h1>
<h3 align="center"><i>(M1PEX_TP_rabbitmq)</i></h3>

<p align="center">

</p>

<p align="center">
  <p align="center">
      Chat app using message queue with <a href="https://www.rabbitmq.com">RabbitMQ</a>.
</p> 
    <p align="center">.
        <a href="https://github.com/hugo-HDSF/M1PEX_TP_rabbitmq/issues">Report Bug</a>
        .
        <img src="https://img.shields.io/github/license/ucan-lab/docker-laravel" alt="License" height="15">
    </p>
</p>

<div align="center">

![Node.js](https://img.shields.io/badge/-Node.js_21.22-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/-React_17.0-61DAFB?logo=react&logoColor=white)
![RabbitMQ](https://img.shields.io/badge/-RabbitMQ_3.13-FF6600?logo=rabbitmq&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker_25.0-2496ED?logo=docker&logoColor=white)
![Docker Compose](https://img.shields.io/badge/-Docker_Compose_2.24-2496ED?logo=docker&logoColor=white)
</div>

<div align="center">

![Javascript](https://img.shields.io/badge/-Javascript_ES6-F7DF1E?logo=javascript&logoColor=black)

</div>

-----

## Setup

Run the following to set up the chat app:

### Docker :
```shell
make up
```

### OR

### Locally :

```shell
docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 -p 5672:5672 rabbitmq:3-management`
cd server
npm run start
cd ..
cd client
npm run start
```
> [!NOTE] 
> Navigate to http://localhost:3050 to see the client.

> [!TIP]  
> You can open multiple tabs to simulate multiple users chatting.