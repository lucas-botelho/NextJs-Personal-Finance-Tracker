import { firestore } from "@/firebase/clientApp";
import { query, collection, getDocs } from "firebase/firestore";
import { monthlyStatusWhereClauses } from "../helpers/whereClauses";


export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (typeof body.userID === 'undefined') {
            throw new Error("userId is undefined");
        }

        const incomeRef = collection(firestore, 'Saving');
        const queryRef = query(incomeRef,
            ...monthlyStatusWhereClauses(body.userID)
        );

        const snapshot = await getDocs(queryRef);

        let totalIncome = 0;
        snapshot.forEach((doc) => {
            const incomeAmount = doc.data().amount;
            totalIncome += incomeAmount;
        });

        return new Response(JSON.stringify({ totalIncome: totalIncome }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
