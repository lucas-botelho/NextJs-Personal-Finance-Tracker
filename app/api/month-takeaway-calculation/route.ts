import { firestore } from "@/firebase/clientApp";
import { collection, query, getDocs, doc, setDoc } from "firebase/firestore";
import { monthlyTakyawayNonRecurringWhereClauses, monthlyTakyawayRecurringWhereClauses } from "../helpers/whereClauses";

export async function POST(request: Request) {
    try {
        const { userId } = await request.json();
        const currentDate = new Date();
        const expenseRef = collection(firestore, 'Expense');
        const savingsRef = collection(firestore, 'Saving');
        const incomeRef = collection(firestore, 'Income');

        const nonRecurringClauses = monthlyTakyawayNonRecurringWhereClauses(userId);
        const recurringClauses = monthlyTakyawayRecurringWhereClauses(userId);

        // Create queries for non-recurring items
        const nonRecurringExpenseQuery = query(expenseRef, ...nonRecurringClauses);
        const nonRecurringSavingsQuery = query(savingsRef, ...nonRecurringClauses);
        const nonRecurringIncomeQuery = query(incomeRef, ...nonRecurringClauses);

        // Create queries for recurring items
        const recurringExpenseQuery = query(expenseRef, ...recurringClauses);
        const recurringSavingsQuery = query(savingsRef, ...recurringClauses);
        const recurringIncomeQuery = query(incomeRef, ...recurringClauses);

        // Execute all queries and combine the results
        const [nonRecurringExpenseSnapshot, nonRecurringSavingsSnapshot, nonRecurringIncomeSnapshot,
            recurringExpenseSnapshot, recurringSavingsSnapshot, recurringIncomeSnapshot] = await Promise.all([
                getDocs(nonRecurringExpenseQuery),
                getDocs(nonRecurringSavingsQuery),
                getDocs(nonRecurringIncomeQuery),
                getDocs(recurringExpenseQuery),
                getDocs(recurringSavingsQuery),
                getDocs(recurringIncomeQuery)
            ]);

        // Combine the snapshots
        const allExpenseDocs = [...nonRecurringExpenseSnapshot.docs, ...recurringExpenseSnapshot.docs];
        const allSavingsDocs = [...nonRecurringSavingsSnapshot.docs, ...recurringSavingsSnapshot.docs];
        const allIncomeDocs = [...nonRecurringIncomeSnapshot.docs, ...recurringIncomeSnapshot.docs];

        // Calculate totals
        const expenseTotal = allExpenseDocs.reduce((total, doc) => total + doc.data().amount, 0);
        const savingsTotal = allSavingsDocs.reduce((total, doc) => total + doc.data().amount, 0);
        const incomeTotal = allIncomeDocs.reduce((total, doc) => total + doc.data().amount, 0);

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
        return new Response(JSON.stringify({ error: { error } }), { status: 500 });
    }
}
