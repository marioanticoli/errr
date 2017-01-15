import React from 'react';

const Register = () => (
  <div>
    <form action="/register" method="post">
      <div>
        <label htmlFor={'email'}>E-mail:</label>
        <input type={'text'} name={'email'} />
        <br />
      </div>
      <div>
        <label htmlFor={'username'}>Username:</label>
        <input type={'text'} name={'username'} />
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

export default Register;
