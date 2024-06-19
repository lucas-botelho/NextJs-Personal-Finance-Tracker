'use client'
import { atom } from 'recoil'

export interface MonthTransactionAtomState {
    value: number;
}

const defaultState: MonthTransactionAtomState = {
    value: 0,
};

export const monthExpensesAtomState = atom({
    key: "monthExpensesAtomState",
    default: defaultState,
});

export const monthIncomeAtomState = atom({
    key: "monthIncomeAtomState",
    default: defaultState,
});

export const monthSavingsAtomState = atom({
    key: "monthSavingsAtomState",
    default: defaultState,
});



