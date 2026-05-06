import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../styles/authStyles.js";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {/* FORMS */}
        {isLogin ? <LoginForm /> : <SignupForm />}

        {/* TOGGLE */}
        <p className="toggle-text">

          {isLogin ? "Don't have an account?" : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: "pointer", color: "cyan" }}
          >
            {isLogin ? " Sign Up" : " Login"}
          </span>

        </p>

      </div>

    </div>
  );
};

export default AuthPage;