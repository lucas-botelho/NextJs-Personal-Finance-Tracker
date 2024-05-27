'use client';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { useState } from "react";
import { useRecoilState } from 'recoil';

interface TransactionModalProps {
    // Define your component props here
}

const TransactionModal: React.FC<TransactionModalProps> = ({ /* Destructure your props here */ }) => {
    const [modalState, setModalState] = useRecoilState(transactionModalState)

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }))
    }

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay>
                    <ModalContent>

                        <ModalHeader> Transaction Modal </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>Body</ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={() => { }}> Add </Button>
                            <Button onClick={handleClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>

                </ModalOverlay>
            </Modal>
        </>
    );
};

export default TransactionModal;