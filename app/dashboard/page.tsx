'use client';
import SideNav from "../components/navigation/sideNav";
import Topbar from "../components/layout/topbar";
import MainContainer from "../components/layout/mainContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { redirect } from "next/navigation";
import CashDisplay from "../components/information/cashDisplay";
import MainContainerHeader from "../components/layout/mainContainerHeader";

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
                    <MainContainerHeader>
                        <CashDisplay title="Income" cash={100} />
                        <CashDisplay title="Expenses" cash={100} />
                        <CashDisplay title="Savings" cash={100} />
                    </MainContainerHeader>

                </MainContainer>
            </div>

        </>);
}
