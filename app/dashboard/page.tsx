'use client';
import SideNav from "../components/navigation/sideNav";
import Topbar from "../components/layout/topbar";
import MainContainer from "../components/layout/mainContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { redirect } from "next/navigation";
import CashDisplay from "../components/information/cashDisplay";
import MainContainerContent from "../components/layout/mainContainerContent";
import ExpenseColumn from "../components/information/expenseColumn";
import BarChartCard from "../components/information/barChartCard";
import TransactionModal from "../components/modal/transactionModal";

export default function Dashboard() {

    const [user, loading, error] = useAuthState(auth);

    if (user === null) {
        redirect('/');
    }

    return (
        <>
            <div className="header-container">
                <Topbar />
            </div>
            <div className="main-container">
                <SideNav />
                <MainContainer>
                    <MainContainerContent>
                        <CashDisplay title="Income" cash={100} />
                        <CashDisplay title="Expenses" cash={100} />
                        <CashDisplay title="Savings" cash={100} />
                    </MainContainerContent>
                    <div className='flex flex-col border-solid pb-1 pl-1 pr-1 mb-6 md:flex-row'>
                        <ExpenseColumn title="Mandatory" />
                        <ExpenseColumn title="Necessities" />
                        <ExpenseColumn title="Wants" />
                    </div>
                    <div className='flex flex-col border-solid pb-1 pl-1 pr-1 mb-6 md:flex-row'>
                        <BarChartCard title="Earning" />
                        <BarChartCard title="Expenses" />
                        <BarChartCard title="Savings" />
                    </div>
                </MainContainer>

                <TransactionModal></TransactionModal>
            </div>

        </>);
}
