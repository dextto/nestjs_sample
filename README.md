<p align=center>
  <img src="https://docs.nestjs.com/assets/logo-small.svg" width=100 height=100 /> This is a sample for nestjs.
</p>

## Features

- Login & Authentication(JWT)
- CQRS, DDD
- Sending Email (nodemailer)
- TypeORM
- Configuration
- Task Scheduling
- Typeorm migration

## Installation

```bash
$ npm install
```

## Setup ENV

make local.env

```=text
EMAIL_SERVICE=
EMAIL_AUTH_USER=
EMAIL_AUTH_PASSWORD=
EMAIL_BASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
SERVICE_URL=
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Migration guide

```bash
# create migration file
$ npm run build
$ npm run migration:create Init

# generate migration file
$ npm run build
$ npm run migration:generate MIGRATION_NAME
```
