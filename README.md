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
