import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';  // Updated import
import { motion } from 'framer-motion';  // For animations
import '../styles/Signup.css';

const SIGNUP_USER = gql`
  mutation Signup($signupDto: SignupDto!) { 
    signup(signupDto: $signupDto) { 
      accessToken 
      userId
    } 
  }
`;

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();  // Updated to useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const signupDto = {
      email: email,
      password: password,
    };

    try {
      const { data } = await signup({
        variables: { signupDto },  // Pass signupDto as a single object
      });
      localStorage.setItem('accessToken', data.signup.accessToken);
      localStorage.setItem('userId', data.signup.userId);
      navigate('/login');
    } catch (err: unknown) {
      console.error('Signup failed', err);
      if (err instanceof Error) {
        alert("Signup failed: " + err.message);
      } else {
        alert("An unknown error occurred during signup.");
      }
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <motion.form 
            className="login"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <motion.input
                type="email"
                className="login__input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <motion.input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                whileFocus={{ scale: 1.05 }}
              />
            </div>
            <motion.button 
              type="submit" 
              className="button login__submit"
              whileHover={{ scale: 1.05 }}
            >
              <span className="button__text">Sign Up</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </motion.button>
          </motion.form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
