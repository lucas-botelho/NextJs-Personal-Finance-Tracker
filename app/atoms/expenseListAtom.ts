'use client'
import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil'

export type Expense = {
    amount: number;
    date: Timestamp;
    isRecurring: boolean;
    title: string;
    userId: string;
    category: string;
    id: string;
}

export interface ExpenseState {
    expenses: Expense[];
}

export const defaultExpenseState: ExpenseState = {
    expenses: [],
};

export const necessaryExpensesAtomState = atom({
    key: "necessaryExpensesAtomState",
    default: defaultExpenseState,
});

export const needsExpensesAtomState = atom({
    key: "needsExpensesAtomState",
    default: defaultExpenseState,
});

export const wantsExpensesAtomState = atom({
    key: "wantsExpensesAtomState",
    default: defaultExpenseState,
});