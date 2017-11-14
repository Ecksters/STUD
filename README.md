# STUD - Students Tracking Useful Data

An application specially designed with the [Arizona StRUT](https://azstrut.org) (Students Recycling Used Technology) program in mind, but with potential for use across other chapters of the StRUT program.

## Features
- User Login and Registration using generated Access Codes to participate in Sections
- Region > Location > Section heirarchy, with user roles and permissions to match
- Tracking of refurbished systems, with verification for submitted systems

The client side of this project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0, with [Angular 5](https://angular.io/) being used for the client.

The server side of this project was written in [PHP 7](https://php.net) with the [PhalconPHP](https://phalconphp.com/) C-extension as our framework. While the project theoretically should run on multiple backends due to Phalcon's PHQL feature, it has only been tested on MySQL.