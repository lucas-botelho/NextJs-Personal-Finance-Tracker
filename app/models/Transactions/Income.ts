import { Timestamp } from 'firebase/firestore';
import { ITransaction } from '../Transactions/Interfaces/ITransaction'

export default class Income implements ITransaction {
    amount: number;
    date: string;
    isRecurring: boolean;
    title: string;
    type: number;

    constructor(amount: number, date: string, isRecurring: boolean, title: string) {
        this.amount = amount;
        this.date = date;
        this.isRecurring = isRecurring;
        this.title = title;
        this.type = 3;
    }
}