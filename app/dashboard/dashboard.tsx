'use client';
import ExpenseColumn from "../components/information/expenseColumn";
import BarChartCard from "../components/information/barChartCard";
import { necessaryExpensesAtomState, needsExpensesAtomState, wantsExpensesAtomState } from "../atoms/expenseListAtom";
import { use, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { set } from "firebase/database";

interface DashboardProps {
    userID: string;
}

interface MonthTakeawayCalculation {
    expenses: number;
    income: number;
    month: number;
    savings: number;
    userId: string;
    year: number;
}

interface Data {
    name: string;
    pv: number;
    amt: number;
}


export default function Dashboard({ userID }: DashboardProps) {
    const [fetchedData, setFetchedData] = useState<MonthTakeawayCalculation[]>([]);
    const [expenses, setExpenses] = useState<Data[]>([]);
    const [savings, setSavings] = useState<Data[]>([]);
    const [income, setIncome] = useState<Data[]>([]);
    const currentDate = new Date();

    useEffect(() => {

        const fetchData = async () => {
            const collectionRef = collection(firestore, 'MonthTakeawayCalculation');
            const whereClauses = [
                where('userId', '==', userID),
                where("year", "==", currentDate.getFullYear())
            ];

            const queryRef = query(collectionRef, ...whereClauses);
            const snapshot = await getDocs(queryRef);

            const responseData: MonthTakeawayCalculation[] = snapshot.docs.map(doc => doc.data() as MonthTakeawayCalculation);
            setFetchedData(responseData);
        }

        fetchData();

    }, []);

    useEffect(() => {
        const expensesData = fetchedData.map(item => ({
            name: new Date(currentDate.getFullYear(), item.month - 1).toLocaleDateString('en-US', { month: 'short' }),
            pv: item.expenses,
            amt: item.expenses,
        }));

        const savingsData = fetchedData.map(item => ({
            name: new Date(currentDate.getFullYear(), item.month - 1).toLocaleDateString('en-US', { month: 'short' }),
            pv: item.savings,
            amt: item.savings,
        }));

        const incomeData = fetchedData.map(item => ({
            name: new Date(currentDate.getFullYear(), item.month - 1).toLocaleDateString('en-US', { month: 'short' }),
            pv: item.income,
            amt: item.income,
        }));

        setExpenses(expensesData);
        setSavings(savingsData);
        setIncome(incomeData);
    }, [fetchedData]);

    return (
        <>
            <div className='card-container h-full'>
                <ExpenseColumn title="Fixed" userID={userID} atom={necessaryExpensesAtomState} />
                <ExpenseColumn title="Needs" userID={userID} atom={needsExpensesAtomState} />
                <ExpenseColumn title="Wants" userID={userID} atom={wantsExpensesAtomState} />
            </div>
            <div className='card-container'>
                <BarChartCard data={income} title="Earning" />
                <BarChartCard data={expenses} title="Expenses" />
                <BarChartCard data={savings} title="Savings" />
            </div>
        </>);
}
