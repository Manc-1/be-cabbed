# Backend Cabbed API

[Project hosted on Heroku](https://be-cabbed.herokuapp.com/api/)

An Express server that provides data to the frontend of our mobile app Cabbed. The project uses a MongoDB database that is hosted in Mongo Atlas.

## Using the API

Produce an initial GET request to /api/ for a list of available endpoints and their behaviours.
The following endpoints are available:

## /api/

```http
GET /api/
```

## /api/users

```http
get /api/users/:_id
```

```http
POST /api/users/login
```

```http
POST /api/users/create_user
```

## /api/articles

```http
GET /api/data/
```

```http
POST /api/data
```
