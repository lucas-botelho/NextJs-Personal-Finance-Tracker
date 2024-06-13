import { ITransaction } from './Interfaces/ITransaction'

export default class Expense implements ITransaction {
    amount: number;
    date: string;
    isRecurring: boolean;
    title: string;
    userId: string;
    category: number;

    constructor(amount: string, date: string, isRecurring: boolean, title: string, userId: string, category: number) {
        this.amount = Number(parseFloat(amount).toFixed(2));
        this.date = date;
        this.isRecurring = isRecurring;
        this.title = title;
        this.userId = userId;
        this.category = category;
    }
}