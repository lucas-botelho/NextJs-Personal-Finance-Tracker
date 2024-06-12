'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import Dashboard from './dashboard/dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/clientApp';
import { Spinner } from '@chakra-ui/react';

export default function AppPage() {
  const [user, loadingUser, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if ((!loadingUser && !user) || error) {
      router.push('/auth');
    }
  }, []);

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
    console.log(user.uid);
    return <Dashboard userID={user.uid} />;
  }

  return null;
}
