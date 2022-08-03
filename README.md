# Storefront Backend Project

## Instructions

1. Install all the dependencies with `npm install`

2. Run Docker Compose with `npm run db`

3. Create a user and the databases with the psql commands

```
    CREATE USER johannesmaier WITH PASSWORD 'geheim';
    CREATE DATABASE storefront;
    CREATE DATABASE storefront_test;
    GRANT ALL PRIVILEGES ON DATABASE storefront TO johannesmaier;
    GRANT ALL PRIVILEGES ON DATABASE storefront_test TO johannesmaier;
```

4. Start the app with `yarn start`

5. Run all the tests with `yarn test`

## Environment Variables

POSTGRES_HOST = localhost
POSTGRES_DB = storefront
POSTGRES_DB_TEST = storefront_test
POSTGRES_USER = johannesmaier
POSTGRES_PASSWORD = geheim
POSTGRES_PORT = 5432
NODE_ENV = dev
BCRYPT_PASSWORD = sonntagshorn
SALT_ROUNDS = 10
TOKEN_SECRET = hochstaufen
