# STUD - Students Tracking Useful Data

The client side of this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0, with [Angular 5](https://angular.io/) being used for the client.

The server side of this project was written in [PHP 7](https://php.net) with the [PhalconPHP](https://phalconphp.com/) C-extension as our framework. While the project
theoretically should run on multiple backends due to Phalcon's PHQL feature, it has only been tested on MySQL.

## Development server

With npm and Angular CLI installed, run `ng serve --public=127.0.0.1:4200` for a client dev server. Navigate to `http://127.0.0.1:4200/`. The app will automatically reload if you change any of the source files. You must use 127.0.0.1 and port 4200, as the dev PHP backend code expects requests to come from this address.

Any PHP with Phalcon installed properly should run the backend without issue. You must manually import the database schema, which is included in the server folder.

## Build

Run `ng build` to build the client project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
