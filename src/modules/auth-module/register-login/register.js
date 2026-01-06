// src/module/auth-module/register-login/register.js

import React from 'https://esm.sh/react@18.2.0';
import { authAPI } from '../auth.js';

export default function Register() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    const result = await authAPI.register(username, email, password);

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    setMessage('Registration successful. Please log in.');

    if (window.navigateToPage) {
      window.navigateToPage('login');
    }
  }

  const banner = window.authImageSrc ? React.createElement('img', { src: window.authImageSrc, alt: 'auth banner', style: { width: '80px', height: '80px', borderRadius: '50%', display: 'block', margin: '12px auto' } }) : React.createElement('div', { style: { width: '80px', height: '80px', borderRadius: '50%', background: '#f5eaff', margin: '12px auto' } });

  return React.createElement(
    'form',
    { onSubmit: handleSubmit, style: { maxWidth: '420px', margin: '24px auto', padding: '16px' } },
    banner,
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '12px' } }, 'Create Account'),
    React.createElement('p', { style: { textAlign: 'center', marginTop: 0, color: '#666' } }, 'Sign up to get started'),
    message && React.createElement('p', { style: { color: '#0a0' } }, message),
    React.createElement('input', {
      placeholder: 'Username',
      value: username,
      onChange: e => setUsername(e.target.value),
      style: { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }
    }),
    React.createElement('input', {
      placeholder: 'Email',
      value: email,
      onChange: e => setEmail(e.target.value),
      style: { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }
    }),
    React.createElement('input', {
      type: 'password',
      placeholder: 'Password',
      value: password,
      onChange: e => setPassword(e.target.value),
      style: { width: '100%', padding: '10px', margin: '8px 0', borderRadius: '8px', border: '1px solid #ddd' }
    }),
    React.createElement('button', { type: 'submit', style: { marginTop: '12px', width: '100%', padding: '12px', borderRadius: '10px', background: 'linear-gradient(90deg,#d946ef,#f472b6)', color: '#fff', border: 'none' } }, 'Sign Up')
  );
}
