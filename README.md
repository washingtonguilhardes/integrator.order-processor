# Order Integrator

## About

This application aims to use TypeScript and Nest to create a solution that reads a txt file, processes the lines, handles the data, and sends it to a database (in this case, PostgreSQL).

The entire architecture is set up in `docker-compose.yml`, where you will find the database and application setup via the `Dockerfile`, which is also included.

The application has 2 endpoints. The `/orders/sync-with-legacy` endpoint processes one file at a time, handles its data, and saves the information to the database. The other endpoint `/orders` returns all registered orders by user, which can be filtered using the parameters orderId, startDate, endDate. The orderId returns the order by the given ID; the startDate and endDate filter the orders within the specified period.

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

## Architecture

Here, a Clean Architecture and DDD (Domain Driven Design) approach was proposed, where the core of the application is entirely abstracted from the framework used, making it possible to reuse the solution in any other project as long as the dependencies are provided. 

In processing the data file, we do not load all information at once but gradually to avoid congesting the main thread of the application. The app reads line by line from the sent buffer and transforms this data with the extracted information. In the extraction process, we use the Strategy Pattern to obtain the data according to each strategy (e.g., the name ranges from 0 to 10 and should not be empty). After this stage, we separate user data and send it to the users' table, followed by the order table, and finally, the order item table. Additionally, we validate if, for the same order, we have items with the same ID. In this case, the application is responsible for registering this item with a comment stating it has a duplicated ID.
This ensures efficiency in data analysis and transformation and the consistency of the persisted information.

## Run Locally

To run the application via Docker, just execute the command `docker compose up` which will set up the database and the application will respond on port 8080 of localhost. 
If desired, you can run the application using the command `npm run start` with the `.env` file containing the following values:

```shell
DATABASE_URL="postgresql://pguser:LocalDB@123Pass@localhost:5432/pguser?schema=public"
FILE_BUCKET_NAME=".files/orders"
```
> These values assume you have the database running locally. If not, just execute the migrations push with `npx prisma db push`.

## Testing

The application has 100% test coverage for its methods and functions. Additionally, we have end-to-end testing that performs an integrated test among all services. To check this status, just execute the command `npm run test`.
