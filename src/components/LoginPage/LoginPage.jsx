import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import GrandFarm from '../../../src/images/GrandFarm_Logo.png'

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-wrapper">
      <img src={GrandFarm} className = 'GrandFarm-login'/>
      <div className='login'>
        <LoginForm />

        <center>
          <button
            type="button"
            className="login-button"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
