import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        await deleteDoc(doc(firestore, 'Expense', body.id));

        return new Response("Deleted with success", { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}