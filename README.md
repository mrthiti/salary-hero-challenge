# Salaty Hero Challenge

It's challenge to make API for manage salary of employee in any company. 

## How to runing the app

```bash
# Prepare env file (copy file example.env into .env)
cp example.env .env

# Prepare PostgreSQL
docker compose -f db-stack.yml up

# Install
npm install

# Run the app
npm run start
```

API is runing at

```
http://localhost:3000
```

You can checkout the document of API (Swagger) at

```
http://localhost:3000/doc
```

Database admin at

```
http://localhost:8080
```
