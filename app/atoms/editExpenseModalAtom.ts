'use client'

import { atom } from 'recoil'

export interface EditExpenseModalAtomState {
    open: boolean;
    id: string;
}

const defaultModalState: EditExpenseModalAtomState = {
    open: false,
    id: '',
};

export const editExpenseModalState = atom<EditExpenseModalAtomState>({
    key: "editExpenseModalState",
    default: defaultModalState,
});