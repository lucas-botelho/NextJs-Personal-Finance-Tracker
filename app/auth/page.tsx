'use client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/clientApp';
export default function Login() {

    const handleGoogleAuth = () => {
        const authProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, authProvider)
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col w-96 h-96 bg-gray-200 rounded-xl items-center justify-center">
                <div className='m-auto mb-16 text-green-800 text-4xl font-mono'>Next-Pf</div>
                <button className="m-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={handleGoogleAuth}>
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}