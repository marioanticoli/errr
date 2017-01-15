import { User } from '../models/user';

module.exports = (passport, LocalStrategy) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  },
    (email, password, done) => {
      User.getAll(email.toLowerCase(), { index: 'email' }).run()
      .then((users) => {
        if (users.length && users[0].authenticate(password)) {
          done(null, users[0].public());
        } else {
          setTimeout(() => {
            done('Sorry, the credentials you entered are invalid', false);
          }, 3000);
        }
      });
    },
  ));
};
