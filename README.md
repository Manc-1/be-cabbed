# Backend Cabbed API

[Project hosted on Heroku](https://be-cabbed.herokuapp.com/api/)

https://be-cabbed.herokuapp.com/api/

An Express server that provides data to the frontend of our mobile app Cabbed, an app used by taxi drivers to share information about events and pickups with other taxi drivers by making post and get requests to the server. The project uses a MongoDB database that is hosted in Mongo Atlas and connected to the server using mongoose.

## Getting Started

Please follow the instructions to get the project up and running for testing and development

## Set Up

Clone data onto local machine:

``` git clone https://github.com/Manc-1/be-cabbed ```

``` cd be-cabbed ```

Install node dependencies, the dependencies can be found in the package.json file:

``` npm install ```

Add an .env file with the connection string from mongoDB and a hashSalt.

Start running the server:

```npm run start```

## Using the API

Produce an initial GET request to /api/ for a list of available endpoints and their behaviours.
The following endpoints are available:

## /api/

```http
GET /api/
```

## /api/users

```http
GET /api/user_id/:_id
```

```http
POST /api/users/login
```

```http
POST /api/users/create_user
```

## /api/pickup

```http
GET /api/pickup
```

```http
POST /api/data
```

```http
GET /api/pickup/hour
```

```http
GET /api/pickup/pasthour
```

```http
GET /api/pickup/:user
```

## /api/marker

```http
GET /api/marker
```

```http
POST /api/marker
```

```http
GET /api/marker/hour
```

```http
GET /api/marker/:user
```

## Running tests
Testing for the endpoints of the server can be found in test/app.spec.js. Ensure *mocha* and *chai* have been installed as dependencies before taking this step:
```npm test```

## Built With

*	Mocha
*	Chai
*	Supertest
*   Node.JS
*	Express
*	Mongoose
*	MongoDB
*   argon2
*   dotenv
*   moment

## Authors

Joanna Kendall, Niels de Visser, Luke Flannery, Aniket Badole, Daniel Harkin

