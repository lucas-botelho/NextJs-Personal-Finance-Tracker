import { Timestamp } from "firebase/firestore";

export interface ITransaction {
    amount: number;
    date: string;
    isRecurring: boolean;
    title: string;
    userId: string;
}
