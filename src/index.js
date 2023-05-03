import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './design/index.css';
import { BrowserRouter } from "react-router-dom";
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import DataReducer  from './utilities/DataReducer'
const appStore = createStore(DataReducer)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Provider store={appStore}>
      <div><App /></div>
      </Provider>
    </BrowserRouter>
  </>
);
