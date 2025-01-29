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

  const [formError, setFormError] = useState<string | null>(null);
  const [hasRegistered, setHasRegistered] = useState(false);

  const { data, loading, error, fetchResource } = useResource<
    RegisterResponse,
    RegisterFormData
  >();

  useEffect(() => {
    if (data && !hasRegistered) {
      const RegisteredUserData = {
        username: data.user.username,
        email: emailRef.current?.value || "",
      };
      onSuccess(RegisteredUserData);
      setHasRegistered(true);
    }
  }, [data, hasRegistered, onSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const username = usernameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (password != confirmPassword) {
      setFormError("Passwords da not match");
      return;
    }

    if (!username || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    setFormError(null);

    const userData: RegisterFormData = { username, email, password };
    await fetchResource(`${API_URL}/api/register`, userData);
    if (data) {
      const RegisteredUserData = {
        username: data.user.username,
        email: emailRef.current?.value || "",
      };
      onSuccess(RegisteredUserData);
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
      <br />
      {formError && <small style={{ color: "red" }}>{formError}</small>}

      {error && <small style={{ color: "red" }}>{error}</small>}

      {loading && <div>Loading...</div>}

      {data && !loading && <div>Registration successful!</div>}

      <br />
      <button type="submit" disabled={loading}>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
