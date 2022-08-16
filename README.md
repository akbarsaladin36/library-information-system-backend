<h1 align="center">Express - Backend Library Information System RESTFUL API with MySQL</h1>

This API is created by me to make backend for library information system website app. This API include authentication and other CRUD process that might be updated gradually. This API use Express as Nodejs framework and MySQL as store database. [More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)


## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/14780095/VUjSGPn3)
9. Type `npm run dev` to activated the server.

## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
DB_PORT= <YOUR SERVER PORT>
DB_HOST= <YOUR DATABASE HOST>
DB_USER= <YOUR DATABASE USERNAME>
DB_PASS= <YOUR DATABASE PASSWORD>
DB_DATABASES= <YOUR DATABASE NAME>

JWT_SECRETKEY = <YOUR JWT SECRET KEY>
```

## Feature

1. Login and Register API
2. CRUD for Users
3. CRUD for Books


## License

© [Muhammad Akbar Saladin Siregar](https://github.com/akbarsaladin36/)
