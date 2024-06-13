import { firestore } from "@/firebase/clientApp";
import { query, collection, where, getDocs } from "firebase/firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (typeof body.userID === 'undefined') {
            throw new Error("userId is undefined");
        }

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        const incomeRef = await collection(firestore, 'Expense');
        const queryRef = await query(incomeRef,
            where('userId', '==', body.userID),
            where('date', '>=', oneMonthAgo)
        );

        const snapshot = await getDocs(queryRef);

        console.log('snapshot:', snapshot);

        let totalIncome = 0;
        snapshot.forEach((doc) => {
            const incomeAmount = doc.data().amount;
            totalIncome += incomeAmount;
        });

        console.log('Total Income:', totalIncome);


        return new Response(JSON.stringify({ totalIncome: totalIncome }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
