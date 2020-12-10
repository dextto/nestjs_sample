This is a sample for nestjs.

## Features

- Login & Authentication(JWT)
- CQRS, DDD
- Sending Email (nodemailer)
- TypeORM
- Configuration
- Task Scheduling

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
