import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import GrandFarm from '../../../src/images/GrandFarm_Logo.png'

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="register-wrapper">
      <div className='register'>
        <RegisterForm />

        <center>
          <button
            type="button"
            className="login-button"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
      <img src={GrandFarm} className = 'GrandFarm-register'/>
    </div>
  );
}

export default RegisterPage;
