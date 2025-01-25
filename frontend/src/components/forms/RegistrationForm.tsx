import React, { FormEvent, useEffect, useRef, useState } from "react";
import { RegisterFormData } from "../../types/User";
import useResource from "../../hooks/useResource";
import { RegisterResponse } from "../../types/ApiResponses";
import { API_URL } from "../../config";

type RegisterFormProps = {
  onSuccess: (data: { username: string; email: string }) => void;
};

const RegistrationForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const { data, loading, fetchResource } = useResource<
    RegisterResponse,
    RegisterFormData
  >();

  useEffect(() => {
    if (data) {
      const RegisteredUserData = {
        username: data.user.username,
        email: emailRef.current?.value || "",
      };
      onSuccess(RegisteredUserData);
      console.log("Registration successful:", data);
    }
  }, [data, onSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (password != confirmPassword) {
      setError("Passwords da not match");
      return;
    }

    if (
      usernameRef.current?.value &&
      emailRef.current?.value &&
      password &&
      confirmPassword
    ) {
      const userData: RegisterFormData = {
        username: usernameRef.current?.value || "",
        email: emailRef.current?.value || "",
        password: password,
      };

      setError(null);
      try {
        await fetchResource(`${API_URL}/api/register`, userData);
      } catch (error) {
        setError(error || "Something went wrong during registration");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" ref={usernameRef} />
      </label>
      <label>
        Email:
        <input type="email" ref={emailRef} />
      </label>
      <label>
        Password:
        <input type="password" ref={passwordRef} />
      </label>
      <label>
        Confirm Password:
        <input type="password" ref={confirmPasswordRef} />
      </label>
      {error && <small style={{ color: "red" }}>{error}</small>}

      {loading && <div>Loading...</div>}

      {data && !loading && <div>Registration successful!</div>}

      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
