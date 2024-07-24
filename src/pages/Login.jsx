import React, { useState } from 'react';
import { Form, Button } from 'antd';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const loginSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const { email, password } = form;
      const { error } = loginSchema.validate({ email, password });
      if (error) {
        setError(error.details[0].message);
        return;
      }
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/auth', {
        email,
        password
      });
      localStorage.setItem('token', response.data);
      navigate('/products');
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred');
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f3f4f6' 
    }}>
      <div style={{
        backgroundColor: '#ffffff', 
        width: '100%',
        maxWidth: '400px', 
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        boxSizing: 'border-box' 
      }}>
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }} htmlFor="email">Email:</label>
            <input 
              style={{
                borderRadius: '4px',
                padding: '10px',
                border: '1px solid #ddd',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '16px'
              }}
              type="text" 
              id='email' 
              value={form.email} 
              name='email' 
              onChange={handleChange} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }} htmlFor="password">Password:</label>
            <input 
              style={{
                borderRadius: '4px',
                padding: '10px',
                border: '1px solid #ddd',
                outline: 'none',
                boxSizing: 'border-box',
                fontSize: '16px'
              }}
              type="password" 
              id='password' 
              value={form.password} 
              onChange={handleChange} 
              name='password' 
            />
          </div>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <Button 
              onClick={handleSubmit} 
              type="primary" 
              htmlType="submit"
              style={{ width: '100%' }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
