[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=EL-BID_moralar-admin&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=EL-BID_moralar-admin)

# Moralar Project
Here are the repositories used in the project:

- Moralar App for end user - https://github.com/EL-BID/moralar-appusuario-flutter
- Morar App for Field Agent (TTS) - https://github.com/EL-BID/moralar-apptts-flutter
- Moralar Web App for Admins, Field Agents and Public managers - https://github.com/EL-BID/moralar-admin
- Web Server for All applications - https://github.com/EL-BID/moralar-api

# WebMoralar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Requirements
- Node 16.14
- Google Maps API Key.


## Environment Variables

In the root directory create .env file with at least these variables:

```
showDefaultLogin: true,
production: false,
GOOGLE_MAPS_API_KEY: {api-key},
baseUrl: {url-api},
assetPath: '/content/upload/'
```

The folder assets/scripts includes a file setEnv.ts that reads the env variables and set them up during the build process.

## Development server

check your nvm list and take a version 14.17.2 of your nodes list

run `npm install` to install all packages. After this step you are free to use other package management tools like Yarn, but keep in mind that if you need to install anything, it has to be with NPM.

Run `ng serve` or `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Change `baseUrl` variable to match your server on `src/environments/environment.dev.ts`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project in mode production.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Deploy to azure aws

1.need before:
 * npm i -g @azure/static-web-apps-cli@1.1.10
 * swith from 14.17.2 to 21.0.0 in the nvm list

2. to deploy
```bash
swa deploy -n {swa-app-name}  ./dist/app -R {resource-group} --deployment-token "{implementation-token}"
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
