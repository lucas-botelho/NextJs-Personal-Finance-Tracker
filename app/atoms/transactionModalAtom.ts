'use client'
import {atom} from 'recoil'

export interface TransactionModalAtomState {
    open: boolean;
    view: "income" | "expense" | "savingIn" | "savingOut";
}

const defaultModalState: TransactionModalAtomState = {
    open: false,
    view: "income",
};

export const transactionModalState = atom<TransactionModalAtomState>({
    key: "transactionModalState",
    default: defaultModalState,
});


