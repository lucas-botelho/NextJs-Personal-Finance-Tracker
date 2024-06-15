'use client';
import ExpenseColumn from "../components/information/expenseColumn";
import BarChartCard from "../components/information/barChartCard";
import { necessaryExpensesAtomState, needsExpensesAtomState, wantsExpensesAtomState } from "../atoms/expenseListAtom";

interface DashboardProps {
    userID: string;
}

export default function Dashboard({ userID }: DashboardProps) {

    return (
        <>
            <div className='card-container'>
                <ExpenseColumn title="Mandatory" userID={userID} atom={necessaryExpensesAtomState} />
                <ExpenseColumn title="Needs" userID={userID} atom={needsExpensesAtomState} />
                <ExpenseColumn title="Wants" userID={userID} atom={wantsExpensesAtomState} />
            </div>
            <div className='card-container'>
                <BarChartCard title="Earning" />
                <BarChartCard title="Expenses" />
                <BarChartCard title="Savings" />
            </div>
        </>);
}
