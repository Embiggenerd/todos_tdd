# todos_tdd

A simple todo app with authentication written with test driven development. A MEAN stack app.

## Visit Site

[Angular Todos tdd](https://serene-peak-33374.herokuapp.com/)

This is using heroku's free tier, so the dyno may be asleep. Give it 10 seconds to startup if you don't see anything.

## Demonstrates

### Testing 

#### Backend

* Backend architecture ensures testability.
* 95% coverage using Mocha.
* Controllers are broken up into services, which are unit tested.
* Routers are integration tested.
* Middleware unit tested.

#### Frontend

* 90%+ coverage using jasmine.
* Many components are tested twice, using different techniques. Some are programmatic, some are more functional. 
* There are some versions of spec files without test beds in the front end. 

### CSS

* No third party frameworks.
* Sass with indentation style.
* Responsiveness using both grid and fled where appropriate.

### Overall

* Todos state is kept in todos-service, fed to different components using rxjs.
* NG Snackbar for error handling, and errors are handled using global error handling.
* Custom error handling in the backend.
* Auth using salted hashes and express-session.
