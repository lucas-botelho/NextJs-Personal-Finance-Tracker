import { cookies } from 'next/headers';
import Login from '../components/auth/login';

export default function Auth() {
    const uID = cookies().get('user')?.value;

    if (uID !== undefined) {

    }
    return (<>
        <Login />
    </>

    );
}