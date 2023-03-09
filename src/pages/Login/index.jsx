import React from 'react';
import './Login.css';
import loginImage from '../../assets/undraw-upload-re-pasx@3x.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [haveAccount, setHaveAccount] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleAccountConfirmationClick = () => {
    setHaveAccount(!haveAccount);
  };

  const handleRegisterDetailChange = event => {
    const { name, value } = event.target;
    setRegisterFormData(previousData => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(previousData => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = event => {
    event.preventDefault();
    if (registerFormData.password === registerFormData.confirmPassword) {
      callCreateUserAPI(registerFormData);
    }
  };

  const handleLoginSubmit = event => {
    event.preventDefault();
    sendLoginData(formData);
  };

  const sendLoginData = async loginCredentials => {
    let data = {
      email: loginCredentials.email,
      password: loginCredentials.password,
    };
    const response = await axios.post(
      'http://localhost:8000/login',
      { data },
      { headers: { 'Content-Type': 'application/json' } }
    );
    localStorage.setItem('token', response.data);
    alert('login successfull');
    navigate('/home');
  };

  const callCreateUserAPI = async userDetails => {
    let data = {
      email: userDetails.email,
      password: userDetails.password,
    };
    const response = await axios.post(
      'http://localhost:8000/register',
      { data },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.status === 200) {
      alert('User created successfully');
    }
  };

  return (
    <div className='login'>
      <div className='login-left'>
        <div className='login-left-text'>
          <div className='login-left-text-title'>
            <h1>Design APIs fast,</h1>
            <h1>Manage content easily.</h1>
          </div>
          <div className='circles'>
            <div className='circle'></div>
          </div>
          <div className='small-circle'></div>
        </div>
        <div className='login-left-img'>
          <img src={loginImage} alt='login' />
        </div>
        <div className='login-left-lower-circles'>
          <div className='circle'></div>
          <div className='small-circle'></div>
        </div>
      </div>
      <div className='login-right'>
        <div className='login-right-text'>
          {haveAccount ? (
            <div>
              <h1>Login to your CMS+ account</h1>
              <div className='form-container'>
                <form onSubmit={handleLoginSubmit}>
                  <label htmlFor='email'>Email</label>
                  <br />
                  <input
                    type='email'
                    className='form-input'
                    value={formData.userName}
                    name='email'
                    onChange={handleChange}
                  />
                  <label htmlFor='password'>Password</label>
                  <br />
                  <input
                    type='password'
                    className='form-input'
                    value={formData.password}
                    name='password'
                    onChange={handleChange}
                  />
                  <br />
                  <button type='submit'>Login</button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <h1>Register your CMS+ account</h1>
              <div className='form-container'>
                <form onSubmit={handleRegisterSubmit}>
                  <label htmlFor='email'>Email</label>
                  <br />
                  <input
                    type='email'
                    className='form-input'
                    value={registerFormData.userName}
                    name='email'
                    onChange={handleRegisterDetailChange}
                  />
                  <label htmlFor='password'>Password</label>
                  <br />
                  <input
                    type='password'
                    className='form-input'
                    value={registerFormData.password}
                    name='password'
                    onChange={handleRegisterDetailChange}
                  />
                  <label htmlFor='confirmPassword'>Confirm Password</label>
                  <br />
                  <input
                    type='password'
                    className='form-input'
                    value={registerFormData.confirmPassword}
                    name='confirmPassword'
                    onChange={handleRegisterDetailChange}
                  />
                  <button type='submit'>Register</button>
                </form>
              </div>
            </div>
          )}
          <div className='confirmation-text'>
            {!haveAccount && (
              <span className='login-confirmation'>
                Already have an account?{' '}
                <span className='login-text' onClick={handleAccountConfirmationClick}>
                  Login
                </span>
              </span>
            )}
            {haveAccount && (
              <span className='register-confirmation'>
                Dont have an account?{' '}
                <span className='register-text' onClick={handleAccountConfirmationClick}>
                  Register
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
