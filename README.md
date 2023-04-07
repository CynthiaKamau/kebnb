## ✨ Installation

1. Install dependencies via `yarn`
2. Create your docker containers via `docker-compose up -d`
3. create .env file based on .env.example

```
PORT=8080
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=mikro-orm-graphql-data
NODE_DEV=true
```
4. Run via `yarn start` or `yarn dev`
5. GraphQL API is running on  [localhost:5000/graphql](http://localhost:8080/graphql)