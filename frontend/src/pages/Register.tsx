import React, { useState } from "react";
import Modal from "../components/shared/Modal";
import RegistrationForm from "../components/forms/RegistrationForm";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleRegisterSuccess = (data: { username: string; email: string }) => {
    setUserData(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div>
      <h1>Register</h1>
      <RegistrationForm onSuccess={handleRegisterSuccess} />
      <Modal shouldShow={isModalOpen} onRequestClose={handleCloseModal}>
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
