'use client';
import SideNav from "../components/navigation/sideNav";
import Topbar from "../components/layout/topbar";
import MainContainer from "../components/layout/mainContainer";
import CashDisplay from "../components/information/monthTotals/cashDisplay";
import MainContainerHeader from "../components/layout/mainContainerHeader";
import ExpenseColumn from "../components/information/expenseColumn";
import BarChartCard from "../components/information/barChartCard";
import TransactionModal from "../components/modal/transactionModal";
import { useEffect, useState } from "react";

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
