'use client'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/clientApp';


export default function Login() {

    const handleGoogleAuth = () => {
        const authProvider = new GoogleAuthProvider();
        signInWithPopup(auth, authProvider).then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            if (user) {
                window.location.href = '/';
            }
        })
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