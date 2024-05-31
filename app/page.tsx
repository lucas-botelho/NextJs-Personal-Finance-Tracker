import { cookies } from 'next/headers';
import Dashboard from './dashboard/dashboard';
import { redirect } from 'next/navigation'
export default function AppPage() {
  const uID = cookies().get('user')?.value;

  if (uID === undefined) {
    redirect('/auth');
  }

  return (<>
    <Dashboard userId={uID} />
  </>

  );
}