# Horizan MVP Website Alpha

#### To start the web app:

1) Run `npm install -g create-react-app` this installs the [framework](https://github.com/facebookincubator/create-react-app) the app is built on.
2) Cd into horizanwebapp
3) Run `npm install`
4) Run `npm run build-styles`
5) On a separate terminal window run `yarn start` or `npm start` (temporary solution)

## About the project

#### The main frameworks used in the project setup so far:
* [React](https://reactjs.org/) for the view layer.
* [Redux](https://redux.js.org/) for unidirectional dataflow to the view layer.
* [Immutable](https://facebook.github.io/immutable-js/) which provides many [Persistent](https://en.wikipedia.org/wiki/Persistent_data_structure) Immutable data structures.
* [Redux-Sagas](https://redux-saga.js.org/) a library that aims to make application side effects (i.e. asynchronous things like data fetching and impure things like accessing the browser cache) easier to manage, more efficient to execute, simple to test, and better at handling failures.

#### File structure and view layer architecture:
* [Presentational and Container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) allows us to nail separation of concerns in a way that scales. (Only used in the src/views directory)
* [Ducks](https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be?source=search_post---------3) file structure that packs together everything redux into one folder based on feature
rather than function. (Only used in the src/state/ducks directory)