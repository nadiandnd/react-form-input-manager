import React, { FormEvent, useState } from "react";
import { LoginFormData } from "../../types/User";

type LoginFormProps = {
  onSubmit: (formData: LoginFormData) => void;
  loading: boolean;
  error: string | null;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <br />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </form>
  );
};

export default LoginForm;
