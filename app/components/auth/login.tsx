'use client';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCookies } from 'next-client-cookies';
import { auth } from '@/firebase/clientApp';
import { redirect } from 'next/navigation';


interface LoginProps {
}

const Login: React.FC<LoginProps> = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col w-96 h-96 bg-gray-200 rounded-xl items-center justify-center">
                <div className='m-auto mb-16 text-green-800 text-4xl font-mono'>Next-Pf</div>
                <button onClick={() => signInWithGoogle()} className="m-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};

export default Login;