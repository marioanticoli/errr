import React from 'react';

const Login = () => (
  <div>
    <form action="/login" method="post">
      <div>
        <label htmlFor={'email'}>E-mail:</label>
        <input type={'text'} name={'email'} />
        <br />
      </div>
      <div>
        <label htmlFor={'password'}>Password:</label>
        <input type={'password'} name={'password'} />
      </div>
      <div>
        <input type={'submit'} value={'Submit'} />
      </div>
    </form>
  </div>
);

export default Login;
