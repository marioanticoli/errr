/* global document window: true */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';
import reducers from './reducers';
import startChat, { chatMiddleware } from './chat';
import Home from './components/home';
import MatchBoard from './components/matchboard';
import Profile from './components/profile';
import AboutUs from './components/aboutus';
import ContactUs from './components/contactus';
import Login from './components/login';
import Register from './components/register';
import Error404 from './components/error404';

const initialState = window.INITIAL_STATE;
const createStoreWithMiddleware = applyMiddleware(chatMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers(initialState));

startChat(store);
let component = null;

switch (store.getState().activePage) {
  case 'home':
    component = <Home />;
    break;
  case 'matchboard':
    component = <MatchBoard />;
    break;
  case 'profile':
    component = <Profile />;
    break;
  case 'aboutus':
    component = <AboutUs />;
    break;
  case 'contactus':
    component = <ContactUs />;
    break;
  case 'login':
    component = <Login />;
    break;
  case 'register':
    component = <Register />;
    break;
  default:
    component = <Error404 />;
}

ReactDOM.render(
  <Provider store={store}>
    <App>
      {component}
    </App>
  </Provider>
, document.getElementById('app'));
