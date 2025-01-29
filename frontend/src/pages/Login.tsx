import React, { useEffect } from "react";
import useResource from "../hooks/useResource";
import { LoginFormData } from "../types/User";
import { LoginResponse } from "../types/ApiResponses";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import LoginForm from "../components/forms/LoginForm";
import "./Login.css";

const Login = () => {
  const { data, loading, error, fetchResource } = useResource<
    LoginResponse,
    LoginFormData
  >();
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    await fetchResource(`${API_URL}/api/login`, formData);
  };

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      navigate("/");
    }
  }, [data, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default Login;
