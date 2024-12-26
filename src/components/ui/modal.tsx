import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  children: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children }) => (
  <div className="modal-header">
    <h2>{children}</h2>
  </div>
);

interface ModalBodyProps {
  children: React.ReactNode;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children }) => (
  <div className="modal-body">
    {children}
  </div>
);

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => (
  <div className="modal-footer">
    {children}
  </div>
);

export const Button: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
}> = ({ onClick, children }) => (
  <button onClick={onClick} className="modal-button">
    {children}
  </button>
);