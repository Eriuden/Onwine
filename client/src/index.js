import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import reducers from "./redux/reducers/indexReducer";
import { applyMiddleware } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk))
const store = configureStore({reducer:reducers}, composedEnhancers)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();
