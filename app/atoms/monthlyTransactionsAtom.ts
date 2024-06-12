'use client'
import {atom} from 'recoil'

export interface MonthlyIncomeAtomState {
    income: number;
}

const defaultModalState: MonthlyIncomeAtomState = {
    income: 0,
};

export const monthlyTransactionsAtom = atom<MonthlyIncomeAtomState>({
    key: "monthlyTransactionsAtom",
    default: defaultModalState,
});


