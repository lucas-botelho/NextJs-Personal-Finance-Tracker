import { firestore } from "@/firebase/clientApp";
import { query, collection, where } from "firebase/firestore";
import { getUserCookie } from '../../lib/cookies';
import { getDocs } from "firebase/firestore/lite";

export async function GET(request: Request) {
    try {
        const uID = getUserCookie().toString();

        if (uID === "") {
            return new Response(JSON.stringify({ error: "Could not identify user" }), { status: 500 });
        }



        const incomeRef = collection(firestore, 'Income');
        const queryRef = query(incomeRef,
            where('userId', '==', uID),
            where('date', '>=', new Date(new Date().getFullYear(), new Date().getMonth(), 1))
        );

        const snapshot = await getDocs(queryRef);


        return new Response(JSON.stringify({ message: 'Document reference created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
