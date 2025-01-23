import React, { FormEvent, useRef, useState } from "react";
import { RegisterFormData } from "../../types/User";

type RegisterFormProps = {
  onSuccess: (data: RegisterFormData) => void;
};

const RegistrationForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";

    if (password != confirmPassword) {
      setError("Passwords da not match");
      return;
    }
    const data: RegisterFormData = {
      username: usernameRef.current?.value || "",
      email: emailRef.current?.value || "",
      password: password,
    };

    setError(null);
    onSuccess(data);
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
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
