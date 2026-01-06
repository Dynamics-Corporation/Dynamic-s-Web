// src/module/auth-module/register-login/login.js

import React from 'https://esm.sh/react@18.2.0';
import { authAPI } from '../auth.js';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const result = await authAPI.login(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    window.dispatchEvent(new CustomEvent('session:login', {
      detail: {
        user: result.user,
        token: result.token,
        rememberMe: true
      }
    }));

    if (window.navigateToPage) {
      window.navigateToPage('dashboard');
    }
  }

  const banner = window.authImageSrc ? React.createElement('img', { src: window.authImageSrc, alt: 'auth banner', style: { width: '80px', height: '80px', borderRadius: '50%', display: 'block', margin: '12px auto' } }) : React.createElement('div', { style: { width: '80px', height: '80px', borderRadius: '50%', background: '#eef', margin: '12px auto' } });

  return React.createElement(
    'form',
    { onSubmit: handleSubmit, style: { maxWidth: '420px', margin: '24px auto', padding: '16px' } },
    banner,
    React.createElement('h2', { style: { textAlign: 'center', marginBottom: '12px' } }, 'Welcome Back'),
    React.createElement('p', { style: { textAlign: 'center', marginTop: 0, color: '#666' } }, 'Sign in to your account'),
    error && React.createElement('p', { style: { color: 'red' } }, error),
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
    React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' } },
      React.createElement('label', { style: { fontSize: '13px' } }, React.createElement('input', { type: 'checkbox' }), ' Remember me'),
      React.createElement('a', { href: '#', style: { color: '#2d6cdf' } }, 'Forgot password?')
    ),
    React.createElement('button', { type: 'submit', style: { marginTop: '12px', width: '100%', padding: '12px', borderRadius: '10px', background: 'linear-gradient(90deg,#3b82f6,#7c3aed)', color: '#fff', border: 'none' } }, 'Sign In'),
    React.createElement('p', { style: { textAlign: 'center', marginTop: '12px', color: '#666' } }, "Don't have an account? ", React.createElement('a', { href: '#register', onClick: e => { e.preventDefault(); if (window.navigateToPage) window.navigateToPage('register'); } }, 'Sign Up'))
  );
}
