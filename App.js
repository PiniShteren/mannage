import React from 'react';
import Main from './Main';
import "./style.css";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from "./redux/reducers/index";

const store = createStore(Reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
