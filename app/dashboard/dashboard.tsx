'use client';
import ExpenseColumn from "../components/information/expenseColumn";
import BarChartCard from "../components/information/barChartCard";

interface DashboardProps {
    userID: string;
}

export default function Dashboard({ userID }: DashboardProps) {
    // const setMonthlyIncomeState = useSetRecoilState(monthlyTransactionsAtom);
    // const [incomeAmount, setIncomeAmount] = useRecoilState(monthlyTransactionsAtom)

    return (
        <>
            <div className='card-container'>
                <ExpenseColumn title="Mandatory" />
                <ExpenseColumn title="Needs" />
                <ExpenseColumn title="Wants" />
            </div>
            <div className='card-container'>
                <BarChartCard title="Earning" />
                <BarChartCard title="Expenses" />
                <BarChartCard title="Savings" />
            </div>
        </>);
}
