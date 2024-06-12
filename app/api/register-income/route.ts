import { firestore } from "@/firebase/clientApp";
import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getUserCookie } from '../../lib/cookies';
import Income from "@/app/models/Transactions/Income";

export async function POST(request: Request) {
    try {
        const uID = getUserCookie().toString();

        if (uID === "") {
            return new Response(JSON.stringify({ error: "Could not identify user" }), { status: 500 });
        }
        const requestBody: Income = await request.json();

        const expenseCOllectionRef = collection(firestore, 'Income');
        await addDoc(expenseCOllectionRef, {
            amount: requestBody.amount,
            date: Timestamp.fromDate(new Date(requestBody.date)),
            recurring: requestBody.isRecurring ? true : false,
            title: requestBody.title,
            type: requestBody.type,
            userId: uID
        });

        return new Response(JSON.stringify({ message: 'Document reference created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
