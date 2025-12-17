// src/components/ui/ConfirmationDialog.jsx
import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { FaExclamationTriangle, FaQuestionCircle, FaCheckCircle } from 'react-icons/fa';

const DialogContent = styled.div`
  text-align: center;
  padding: 1.5rem 0;
`;

const DialogIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${props => {
    switch (props.type) {
      case 'warning': return '#ffc107';
      case 'danger': return '#dc3545';
      case 'success': return '#28a745';
      default: return '#667eea';
    }
  }};
`;

const DialogTitle = styled.h4`
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const DialogMessage = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const Button = styled.button`
  min-width: 120px;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &.btn-cancel {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #333;
    
    &:hover {
      background: #e9ecef;
    }
  }
  
  &.btn-confirm {
    background: ${props => {
      switch (props.type) {
        case 'warning': return '#ffc107';
        case 'danger': return '#dc3545';
        case 'success': return '#28a745';
        default: return '#667eea';
      }
    }};
    color: white;
    
    &:hover {
      opacity: 0.9;
    }
  }
`;

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de que deseas realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "default", // 'default', 'warning', 'danger', 'success'
  showCancel = true
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <FaExclamationTriangle />;
      case 'danger':
        return <FaExclamationTriangle />;
      case 'success':
        return <FaCheckCircle />;
      default:
        return <FaQuestionCircle />;
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={showCancel ? onClose : undefined}
      title={title}
      width="400px"
      showCloseButton={showCancel}
    >
      <DialogContent>
        <DialogIcon type={type}>
          {getIcon()}
        </DialogIcon>
        <DialogTitle>{title}</DialogTitle>
        <DialogMessage>{message}</DialogMessage>
        
        <ButtonGroup>
          {showCancel && (
            <Button 
              className="btn-cancel"
              onClick={onClose}
            >
              {cancelText}
            </Button>
          )}
          <Button 
            className="btn-confirm"
            onClick={handleConfirm}
            type={type}
          >
            {confirmText}
          </Button>
        </ButtonGroup>
      </DialogContent>
    </Modal>
  );
};

export default ConfirmationDialog;