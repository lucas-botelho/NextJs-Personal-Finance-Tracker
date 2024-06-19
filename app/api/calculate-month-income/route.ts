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
        const incomeRef = collection(firestore, 'Income');
        const queryRefCurrentMonth = query(incomeRef,
            where('userId', '==', body.userID),
            where('date', '>=', oneMonthAgo),
            where('recurring', '==', false)
        );

        const snapshotCurrentMonth = await getDocs(queryRefCurrentMonth);

        const queryRefRecurring = query(incomeRef,
            where('userId', '==', body.userID),
            where('recurring', '==', true)
        );

        const snapshotRecurring = await getDocs(queryRefRecurring);

        let totalIncome = 0;
        snapshotCurrentMonth.forEach((doc) => {
            const incomeAmount = doc.data().amount;
            totalIncome += incomeAmount;
        });

        snapshotRecurring.forEach((doc) => {
            const incomeAmount = doc.data().amount;
            totalIncome += incomeAmount;
        });

        return new Response(JSON.stringify({ totalIncome: totalIncome }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
