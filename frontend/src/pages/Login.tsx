import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import "../styles/Signup.css"; // Ensure you add appropriate styles for Login

const LOGIN_USER = gql`
  mutation login($loginDto: LoginDto!) {
    login(loginDto: $loginDto) {
      accessToken
      userId
    }
  }
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    const loginDto = {
      email,
      password,
    };
    try {
      const { data } = await login({
        variables: { loginDto }, // Pass the loginDto object
      });
      localStorage.setItem("accessToken", data.login.accessToken);
      localStorage.setItem("userId", data.login.userId);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage("Invalid email or password. Please try again.");
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
              <span className="button__text">Log In</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </motion.button>
            {errorMessage && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errorMessage}
              </motion.div>
            )}
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

export default Login;
