  <p align="center">Eventpass Country Master</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) project for Eventthai pre-interview test.

## Dependency Installation

```bash
$ npm install
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

## Configuration
See [Project Configuration Documentation](/src/_config/README.md)

## API Documentation
Set SERVER_IS_ENABLE_DOCS environment variable to true and view at http://{hostpath}:{port}/{API_ROUTE_DOC}

## Important notes
Country has to be added into the database before the user can be created, use the following MongoDB statement to insert starter country into the database
```mongosh
db.countries.insertMany([
  {
    "code": "TH",
    "name": "Thailand"
  },
  {
    "code": "EN",
    "name": "England"
  }
]);
```