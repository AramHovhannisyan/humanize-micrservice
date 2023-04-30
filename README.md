1. To start the services run `docker compose up`

2. Sign Up To Get Bearer Token
   METHOD: POST
   BODY: Required attributes
   {
    "username": "string",
    "password": "string"
   }
   url: http://localhost:3100/api/v1/auth/create
3. Or login
   METHOD: POST
   BODY: Required attributes
   {
    "username": "string",
    "password": "string"
   }
   url: http://localhost:3100/api/v1/auth

4. Get data from DATA MART Service
   METHOD: GET
   Authorization Header: Bearer
   http://localhost:3103/api/v1/data


