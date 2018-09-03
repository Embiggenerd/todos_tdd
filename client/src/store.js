import { createStore, applyMiddleware } from 'redux';
import thunkMW from 'redux-thunk';
import todoApp from './components/App/reducers';

const store = createStore(todoApp, applyMiddleware(thunkMW));

export default store;
