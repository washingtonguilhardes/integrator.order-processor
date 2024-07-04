
# Order Integrator

## Sobre

A aplicação aqui criada tem como objetivo utlizar o TypeScript e Nest para criar um solucao que ler um arquivo txt, processa as linhas, trata os dados e enviar para um banco de dados (no caso o postgres).

Toda a arquitetura está montada no `docker-compose.yml` onde encontra-se o setup do banco de dados e da aplicação, via `Dockerfile`, também presente.

A aplicação possue 2 endpoints. O endpoint `/orders/sync-with-legacy` processa um arquivo por vez, trata seus dados e salva as informações no banco. O outro endpoint `/orders` retorna todos os pedidos cadastrados por usuário, podendo ser filtrado com os parametros orderId, startDate, endDate.
O orderId retorna o pedido pelo id passado; O startDate e endDate filtra os pedidos dentro do perído passado


```shell
POST /orders/sync-with-legacy HTTP/1.1
Host: localhost:8080
Content-Length: 201
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW

------WebKitFormBoundary7MA4YWxkTrZu0gW
Content-Disposition: form-data; name="file"; filename="/path/to/file"
Content-Type: <Content-Type header here>

(data)
------WebKitFormBoundary7MA4YWxkTrZu0gW--

```

```shell

GET /orders?orderId=898 HTTP/1.1
Host: localhost:8080

[
    {
        "user_id": 83,
        "name": "Frances Satterfield",
        "orders": [
            {
                "order_id": 898,
                "user_id": 83,
                "date": "2021-07-29T00:00:00.000Z",
                "total": 3349.85,
                "products": [  ... ]
            }
        ]
    }
]
```


```shell
GET /orders?startDate=2021-12-31&endDate=2021-01-01 HTTP/1.1
Host: localhost:8080
[
    {
        "user_id": 88,
        "name": "Terra Daniel DDS",
        "orders": [
            {
                "order_id": 939,
                "user_id": 88,
                "date": "2021-09-19T00:00:00.000Z",
                "total": 3197.65,
                "products": [ ... ]
            },
            {
                "order_id": 938,
                "user_id": 88,
                "date": "2021-03-31T00:00:00.000Z",
                "total": 4590.809999999999,
                "products": [ ... ]
            }
        ]
    }
]
```


## Arquitetura

Aqui foi proposto uma arquitetura utilizando o Clean Architecture e DDD (Domain Driving Design), onde o core da aplicação fica totalmente abstrato ao framework aqui utilizado, sendo possível reutilizar a solução em qualquer outro projeto, desde que as dependencias sejam supridas.
No processamento do arquivo de dados, não carregamos todas as informações logo de início, e sim gradualemten, a fim de evitar que a tread principal da aplicação seja congetionada, então o app lê linha a linha do buffer enviado e transforma esse dado com as informações estraídas. No processo de extração, utlizamos o Strategy Pattern para obter os dados de acordo com a estratégia de obtenção de cada um (Ex: nome fica de 0 até 10, e não deve ser vazio). Depois dessa etapa, separamos os dados dos usuários e mandamos para a tabela de usuários, em sequencia a do pedido, e por fim o item de pedido. Além disso, validamos se para o mesmo pedido, temos items com o mesmo id. Nesse caso, a aplicação é responsável por registrar esse item com um comentário dizendo que ele tem o id duplicado.
Com isso garatimos uma eficiencia na análize e transformação dos dados, além da consistencia das informações persistidas.

## Executar localmente

Para executar a aplicação via docker, basta executar o comando `docker compose up` que o banco de dado será montado e a aplcação passará a responder na porta 8080 do localhost
Caso queira, pode-se executar a aplicação utilizando o comando `npm run start` com o arquivo `.env` com os valores abaixo:
```shell
DATABASE_URL="postgresql://pguser:LocalDB@123Pass@localhost:5432/pguser?schema=public"
FILE_BUCKET_NAME=".files/orders"
```
> Esses valores consideram que você tenha o banco de dados executando localmente. Caso não tenha, basta executar o push das migrações `npx prisma db push`

## Teste
A aplicação tem a cobertura de teste em 100% dos seus métodos e funções. Além disso temos o teste end-to-end que executa um teste integrado entre todos os serivços. Para verificar esse status, basta executar o comando `npm run test`
