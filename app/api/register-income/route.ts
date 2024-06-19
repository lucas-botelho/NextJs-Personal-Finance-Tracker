import { firestore } from "@/firebase/clientApp";
import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import Income from "@/app/models/Transactions/Income";

export async function POST(request: Request) {
    try {
        const requestBody: Income = await request.json();

        const expenseCOllectionRef = collection(firestore, 'Income');
        await addDoc(expenseCOllectionRef, {
            amount: requestBody.amount ?? 0,
            date: Timestamp.fromDate(new Date(requestBody.date)),
            recurring: requestBody.isRecurring ? true : false,
            title: requestBody.title,
            userId: requestBody.userId
        });

        return new Response(JSON.stringify({ message: 'Document reference created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
