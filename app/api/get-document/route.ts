import { firestore } from "@/firebase/clientApp";
import { Timestamp, addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { getUserCookie } from '../../lib/cookies';
import Income from "@/app/models/Transactions/Income";
// interface Category{
//     name: string;
// }

// interface TransactionType{
//     name: string;
// }

export async function POST(request: Request) {
    try {
        const uID = getUserCookie().toString();

        if(uID === ""){
            return new Response(JSON.stringify({ error: "Could not identify user" }), { status: 500 });
        }

       
        const requestBody : Income = await request.json();
        console.log(requestBody);

        const expenseCOllectionRef = collection(firestore, 'Expense');
        await addDoc(expenseCOllectionRef, {
            amount: requestBody.amount,
            date: Timestamp.fromDate(new Date(requestBody.date)),
            recurring: requestBody.isRecurring,
            title: requestBody.title,
            type: requestBody.type,
            userId: uID
        });
        // const expenseDocRef = doc(firestore, 'Expense');
        // const document = await getDoc(expenseDocRef);
        // console.log(document.data());
        
        // const typeDocRef = doc(firestore, 'ExpenseCategory', '1');
        // const categoryDocRef = doc(firestore, 'TransactionType', '3');

        // const type = (await getDoc(typeDocRef)).data() as TransactionType;
        // const category = (await getDoc(categoryDocRef)).data() as Category;

        const timestamp = serverTimestamp()
        // await setDoc(expenseDocRef, {
        //     amount: 0,
        //     category: 1,
        //     date: timestamp,
        //     recurrecingDate: timestamp,
        //     recurring: false,
        //     title: 'teste',
        //     type: 1,
        //     userId: uID
        // });


   
        
        return new Response(JSON.stringify({ message: 'Document reference created successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error during submission:', error);
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
