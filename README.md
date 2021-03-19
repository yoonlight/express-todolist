# express-todolist

## Farmework

1. Develope Platform: node.js

1. Webserver: express.js

1. DB: mongoDB(mongoose)

1. Auth: passport.js

mongoose has error so use version 5.11.13

## function

1. Todo CRUD

1. Pagination

1. Filter

1. Search

1. Auth

1. Session

1. Sort

### pacakge

초기 세팅

```shell
yarn init
yarn add express morgan express-session cookie-parser body-parser method-override
yarn add dotenv
yarn add mongoose
yarn add passport passport-jwt bcryptjs jsonwebtoken passport-local passport-local-mongoose
yarn add -D eslint eslint-config-prettier eslint-plugin-prettier prettier
node_modules/.bin/eslint --init
```

how to use es moduel

```json
{
  "type": "module",
  "scripts": {
    "start": "nodemon --experimental-specifier-resolution=node src"
  }
}
```

[distinct query](https://stackoverflow.com/questions/6043847/how-do-i-query-for-distinct-values-in-mongoose)
