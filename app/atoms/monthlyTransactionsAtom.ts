'use client'
import { atom } from 'recoil'

export interface MonthExpensesAtomState {
    value: number;
}

const defaultModalState: MonthExpensesAtomState = {
    value: 0,
};

export const monthExpensesAtomState = atom<MonthExpensesAtomState>({
    key: "monthExpensesAtomState",
    default: defaultModalState,
});


