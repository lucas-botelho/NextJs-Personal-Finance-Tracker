import { cookies } from 'next/headers';
import Login from '../components/auth/login';

export default function Auth() {
    return (<Login />);
}