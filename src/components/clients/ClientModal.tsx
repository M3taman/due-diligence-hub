import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@/components/ui/modal';
import { supabase } from '@/lib/supabase/client';

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
}

export const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, clientId }) => {
  // Fetch client details based on clientId if necessary

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Client Details</ModalHeader>
      <ModalBody>
        {/* Display client details here */}
        <p>Client ID: {clientId}</p>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};