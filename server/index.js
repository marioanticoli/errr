import path from 'path';
import express from 'express';
import handlebars from 'express-handlebars';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import localS from 'passport-local';
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
// models
import { User } from './models/user';
// strategies
import localStrategy from './passport-strategies/local';

const app = express();

// View templates
app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  layoutsDir: path.resolve(__dirname, 'views/layouts'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // set to true?
}));
app.use(passport.initialize());
app.use(passport.session());

// Pass just the user id to the passport middleware
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Reading your user base on the user.id
passport.deserializeUser((id, done) => {
  User.get(id).run().then((user) => {
    done(null, user.public());
  });
});

localStrategy(passport, localS.Strategy);

// Routes
app.post('/register', (req, res) => {
  User.filter({ email: req.body.email.toLowerCase() || '' }).count().execute()
  .delay(1500)
  .then((count) => {
    if (count === 0) { return true; }
    throw new Error('A user is already registered with that email address');
  })
  .then(() => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    return user.save();
  })
  .then(() => {
    res.redirect('/login');
  })
  .catch((err) => { res.json({ error: err.message }); });
});

app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({ loggedin: true });
  },
);

app.get('*', (req, res) => {
  const namePlatform = 'Gamebar';
  let obj = null;
  let navKey = null;
  switch (req.url) {
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

  res.render('app', {
    title: `${obj.title} | ${namePlatform}`,
    keywords: obj.keywords,
    description: obj.description,
    app: appContent,
    initialState: JSON.stringify(initialState),
  });
});

export default app;
