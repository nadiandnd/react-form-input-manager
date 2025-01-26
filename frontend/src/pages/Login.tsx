import React from "react";
import useResource from "../hooks/useResource";
import { LoginFormData } from "../types/User";
import { LoginResponse } from "../types/ApiResponses";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
  const { data, loading, error, fetchResource } = useResource<
    LoginResponse,
    LoginFormData
  >();
  const navigate = useNavigate();

  const handleLogin = async (formData: LoginFormData) => {
    await fetchResource(`${API_URL}/api/login`, formData);

    if (data?.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      navigate("/home");
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} loading={loading} error={error} />
    </div>
  );
};

export default Login;
