import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBody = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  color: rgb(66, 31, 112);
`;

interface ModalProps {
  shouldShow: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  shouldShow,
  onRequestClose,
  children,
}) => {
  if (!shouldShow) return null;

  return (
    <ModalBackground onClick={onRequestClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        {children}
        <button
          onClick={onRequestClose}
          style={{ marginTop: "10px", color: "white" }}
        >
          Close
        </button>
      </ModalBody>
    </ModalBackground>
  );
};

export default Modal;
