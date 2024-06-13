'use client'
import { atom } from 'recoil'

export interface MonthExpensesAtomState {
    value: number;
}

const defaultExpensesModalState: MonthExpensesAtomState = {
    value: 0,
};

export const monthExpensesAtomState = atom<MonthExpensesAtomState>({
    key: "monthExpensesAtomState",
    default: defaultExpensesModalState,
});


export interface MonthIncomeAtomState {
    value: number;
}

const defaultIncomeModalState: MonthIncomeAtomState = {
    value: 0,
};

export const monthIncomeAtomState = atom<MonthIncomeAtomState>({
    key: "monthIncomeAtomState",
    default: defaultIncomeModalState,
});



