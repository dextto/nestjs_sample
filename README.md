<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

Sample for nestjs

## Features

- Login & Authentication(JWT)
- CQRS, DDD
- Sending Email (nodemailer)
- TypeORM
- Configuration
- Task Scheduling
- Typeorm migration
- Admin-bro

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
