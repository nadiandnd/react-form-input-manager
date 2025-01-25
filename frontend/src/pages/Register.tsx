import React, { useState } from "react";
import Modal from "../components/shared/Modal";
import RegistrationForm from "../components/forms/RegistrationForm";

const Register: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const handleRegisterSuccess = (data: { username: string; email: string }) => {
    setUserData(data);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Register</h1>
      <RegistrationForm onSuccess={handleRegisterSuccess} />
      <Modal
        shouldShow={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h2>Registration Successful!</h2>
        {userData && (
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Register;
