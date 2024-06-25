import { firestore } from "@/firebase/clientApp";
import { collection, addDoc, Timestamp, query, where, sum, and, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { monthlyTakyawayCalculationWhereClauses } from "../helpers/whereClauses";


export async function POST(request: Request) {
    try {
        const { userId } = await request.json();
        const currentDate = new Date();
        currentDate.setDate(25);
        const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

        const expenseRef = collection(firestore, 'Expense');
        const savingsRef = collection(firestore, 'Saving');
        const incomeRef = collection(firestore, 'Income');

        const whereClauses = monthlyTakyawayCalculationWhereClauses(userId);

        const expenseQueryRef = query(expenseRef, ...whereClauses);

        const savingsQueryRef = query(savingsRef, ...whereClauses);

        const incomeQueryRef = query(incomeRef, ...whereClauses);

        const [expenseSnapshot, savingsSnapshot, incomeSnapshot] = await Promise.all([
            getDocs(expenseQueryRef),
            getDocs(savingsQueryRef),
            getDocs(incomeQueryRef)
        ]);

        const expenseTotal = expenseSnapshot.docs.reduce((total, doc) => total + doc.data().amount, 0);
        const savingsTotal = savingsSnapshot.docs.reduce((total, doc) => total + doc.data().amount, 0);
        const incomeTotal = incomeSnapshot.docs.reduce((total, doc) => total + doc.data().amount, 0);

        const docRef = doc(firestore, 'MonthTakeawayCalculation', `${userId}_${currentDate.getFullYear()}_${currentDate.getMonth()}`);
        await setDoc(docRef, {
            userId: userId,
            month: currentDate.getMonth(),
            year: currentDate.getFullYear(),
            savings: savingsTotal,
            expenses: expenseTotal,
            income: incomeTotal,
        });

        return new Response(JSON.stringify({ message: 'Document reference created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}