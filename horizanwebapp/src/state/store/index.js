import configureStore from './configureStore';
import * as reducers from './ducks';

const store = configureStore(
  initialState
);

export default store;
