'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Dashboard from './dashboard/dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { Spinner } from '@chakra-ui/react';
import MainContainer from './components/layout/mainContainer';
import MainContainerHeader from './components/layout/mainContainerHeader';
import Topbar from './components/layout/topbar';
import TransactionModal from './components/modal/transactionModal';
import SideNav from './components/navigation/sideNav';
import MonthTotalExpenses from './components/information/monthTotals/monthTotalExpenses';
import MonthTotalIncome from './components/information/monthTotals/monthTotalIncome';
import MonthTotalSavings from './components/information/monthTotals/monthTotalSavings';

export default function AppPage() {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && !user) {
      router.push('/auth');
    }
  }, [user, loadingUser, router]);


  if (loadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </div>
    );
  }

  if (user) {
    return <>
      <div className="header-container">
        <Topbar />
      </div>
      <div className="main-container">
        <SideNav />
        <MainContainer>
          <MainContainerHeader>
            <MonthTotalIncome userID={user.uid} />
            <MonthTotalExpenses userID={user.uid} />
            <MonthTotalSavings userID={user.uid} />
          </MainContainerHeader>
          <Dashboard userID={user.uid} />

        </MainContainer>
      </div>
      <TransactionModal userID={user.uid}></TransactionModal>

    </>
  }

  return null;
}
