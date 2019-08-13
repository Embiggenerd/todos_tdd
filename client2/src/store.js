import { createStore, applyMiddleware } from "redux";
import thunkMW from "redux-thunk";
import todoApp from "./components/App/reducers";

export default state => createStore(todoApp, state, applyMiddleware(thunkMW));

