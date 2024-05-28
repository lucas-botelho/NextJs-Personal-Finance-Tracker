import { cookies } from 'next/headers';
import Dashboard from './dashboard/dashboard';
import Login from './components/auth/login';

export default function AppPage() {
  const uID = cookies().get('user')?.value;

  return (<>
    {
      uID !== undefined ? <Dashboard userId={uID} /> : <Login />
    }
  </>

  );
}