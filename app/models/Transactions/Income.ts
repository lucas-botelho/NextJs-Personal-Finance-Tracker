import { Timestamp } from 'firebase/firestore';
import { ITransaction } from '../Transactions/Interfaces/ITransaction'

export default class Income implements ITransaction {
    amount: number;
    date: string;
    isRecurring: boolean;
    title: string;
    type: number;

    constructor(amount: string, date: string, isRecurring: boolean, title: string) {
        this.amount = Number(parseFloat(amount).toFixed(2));
        this.date = date;
        this.isRecurring = isRecurring;
        this.title = title;
        this.type = 3;
    }
}