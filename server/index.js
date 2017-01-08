import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// bundled components
import App from './generated/app';
import Home from './generated/app';
import MatchBoard from './generated/app';
import Profile from './generated/app';
import AboutUs from './generated/app';
import ContactUs from './generated/app';
import Login from './generated/app';
import Register from './generated/app';
import Error404 from './generated/app';

const app = express();

// View templates
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));

// Static assets
app.use(express.static(path.resolve(__dirname, '../dist')));

// Routes
app.get('*', (request, response) => {
  const namePlatform = 'Gamebar';
  let obj = null;
  let navKey = null;
  switch (request.url) {
    case '/':
      obj = {
        component: <Home />,
        title: 'Home',
        description: '',
        keywords: '',
      };
      navKey = 'home';
      break;
    case '/matchboard':
      obj = {
        component: <MatchBoard />,
        title: 'Match Board',
        description: '',
        keywords: '',
      };
      navKey = 'matchboard';
      break;
    case '/profile':
      obj = {
        component: <Profile />,
        title: 'Profile',
        description: '',
        keywords: '',
      };
      navKey = 'profile';
      break;
    case '/aboutus':
      obj = {
        component: <AboutUs />,
        title: 'About Us',
        description: '',
        keywords: '',
      };
      navKey = 'aboutus';
      break;
    case '/contactus':
      obj = {
        component: <ContactUs />,
        title: 'Contact Us',
        description: '',
        keywords: '',
      };
      navKey = 'contactus';
      break;
    case '/login':
      obj = {
        component: <Login />,
        title: 'Login',
        description: '',
        keywords: '',
      };
      navKey = 'login';
      break;
    case '/register':
      obj = {
        component: <Register />,
        title: 'Register',
        description: '',
        keywords: '',
      };
      navKey = 'register';
      break;
    default:
      obj = {
        component: <Error404 />,
        title: 'Error',
        description: '',
        keywords: '',
      };
      break;
  }
  const initialState = {
    userId: null,
    currentMessage: '',
    messages: [],
    activePage: navKey,
  };
  const store = createStore((state = initialState) => state);
  const appContent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App>
        {obj.component}
      </App>
    </Provider>,
  );

  response.render('app', {
    title: `${obj.title} | ${namePlatform}`,
    keywords: obj.keywords,
    description: obj.description,
    app: appContent,
    initialState: JSON.stringify(initialState),
  });
});

export default app;
