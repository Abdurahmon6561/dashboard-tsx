import React, { useState } from 'react';
import { Form, Button } from 'antd';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

const loginSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const initialState = {
    name: '',
    email: '',
    password: '',
}

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    try {
      const { name, email, password } = form;
      const { error } = loginSchema.validate({ name, email, password });
      if (error) {
        setError(error.details[0].message);
        return;
      }
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/register', {
        name,
        email,
        password
      });
      localStorage.setItem('token', response.data);
      navigate('/login');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };


  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f2f5' 
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        width: '400px', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        border: '1px solid #e8e8e8', 
      }}>
        <Form>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            marginBottom: '16px' 
          }}>
            <label style={{ 
              fontSize: '18px', 
              marginBottom: '8px' 
            }} htmlFor="name">Name</label>
            <input 
              style={{ 
                borderRadius: '4px', 
                padding: '10px', 
                border: '1px solid #d9d9d9', 
                outline: 'none', 
                fontSize: '16px', 
                width: '100%' 
              }} 
              placeholder='Enter name' 
              type="text" 
              id='name' 
              value={form.name} 
              name='name' 
              onChange={handleChange} 
            />
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            marginBottom: '16px' 
          }}>
            <label style={{ 
              fontSize: '18px', 
              marginBottom: '8px' 
            }} htmlFor="email">Email</label>
            <input 
              style={{ 
                borderRadius: '4px', 
                padding: '10px', 
                border: '1px solid #d9d9d9', 
                outline: 'none', 
                fontSize: '16px', 
                width: '100%' 
              }} 
              placeholder='Enter Email' 
              type="text" 
              id='email' 
              value={form.email} 
              name='email' 
              onChange={handleChange} 
            />
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            marginBottom: '16px' 
          }}>
            <label style={{ 
              fontSize: '18px', 
              marginBottom: '8px' 
            }} htmlFor="password">Password</label>
            <input 
              style={{ 
                borderRadius: '4px', 
                padding: '10px', 
                border: '1px solid #d9d9d9', 
                outline: 'none', 
                fontSize: '16px', 
                width: '100%' 
              }} 
              placeholder='Enter Password' 
              type="password" 
              id='password' 
              value={form.password} 
              onChange={handleChange} 
              name='password' 
            />
          </div>
          {error && <p style={{ color: 'red', marginBottom: '16px' }}>{error}</p>}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between' 
          }}>
            <Button 
              onClick={handleSubmit} 
              type="primary" 
              htmlType="submit"
              style={{ width: '48%' }}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
