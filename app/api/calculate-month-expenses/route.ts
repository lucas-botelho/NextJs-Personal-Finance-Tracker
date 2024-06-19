import { firestore } from "@/firebase/clientApp";
import { query, collection, where, getDocs, or, and } from "firebase/firestore";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (typeof body.userID === 'undefined') {
            throw new Error("userId is undefined");
        }

        const currentDate = new Date();
        const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 25);
        const incomeRef = await collection(firestore, 'Expense');
        const queryRef = await query(incomeRef,
            and(
                where('userId', '==', body.userID),
                where('date', '>=', oneMonthAgo),
                or(
                    where('recurring', '==', true)
                )
            )
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
