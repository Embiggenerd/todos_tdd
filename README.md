# todos_tdd

A simple todo app with authentication written with test driven development. A MERN stack app.

## Visit Site

[Todos tdd](https://serene-peak-33374.herokuapp.com/)
This is using heroku's free tier, so the dyno may be asleep. Give it 10 seconds to startup if you don't see anything.

## Demonstrates



### Testing

#### Backend

* Backend architecture ensures testability.
* 95% coverage using Mocha.
* Controllers are broken up into services, which are unit tested
* Routers are integration tested
* Middleware unit tested.

#### Frontend

* 95% coverage using Jest.
* Branch react-frontend uses a monolythic front end test using enzyme. Tests are interdependent.
* Branch react-redux uses tests with independent data.

#### CSS

* No third party frameworks.
* Main css file uses flex for holy grail layout, second use floats.
* BEM implementation with variables.
* A phone, tablet, and desktop mode using media queries.

#### Overall

* Composition over inheritence component style
* Vanilla modal for error handling
* Custom error handling in the backend
* Auth using salted hashes and express-session.
* Branch vanilla contains vanilla js frontend version.
