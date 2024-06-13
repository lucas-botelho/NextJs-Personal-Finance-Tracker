'use client';
import { transactionModalState } from '@/app/atoms/transactionModalAtom';
import { modalBodyFactory } from '@/app/factory/modalBodyFactory';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React from 'react';
import { useRecoilState } from 'recoil';

interface TransactionModalProps {
    userID: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ userID }) => {
    const [modalState, setModalState] = useRecoilState(transactionModalState)

    const handleClose = () => {
        setModalState(prev => ({ ...prev, open: false }))
    }


    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose} >
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>
                            {modalState.view === "income" && "Add Income"}
                            {modalState.view === "expense" && "Register Expense"}
                            {modalState.view === "savingIn" && "Savings In"}
                            {modalState.view === "savingOut" && "Savings Out"}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
                            {modalBodyFactory(modalState.view, userID)}
                        </ModalBody>
                    </ModalContent>
                </ModalOverlay>
            </Modal >
        </>
    );
};

export default TransactionModal;