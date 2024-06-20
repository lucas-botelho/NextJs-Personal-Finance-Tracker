import { QueryFieldFilterConstraint, where } from "firebase/firestore";

export function monthlyStatusWhereClauses(userID: string): QueryFieldFilterConstraint[] {

    const currentMonth = new Date();
    currentMonth.setDate(25);
    const monthPrior = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 25);


    return [
        where('userId', '==', userID),
        where('date', '>=', monthPrior),
        where('date', '<=', currentMonth),
        where('recurring', '==', false)
    ];
}

export function monthlyStatusRecurringWhereClauses(userID: string): QueryFieldFilterConstraint[] {

    const currentMonth = new Date();
    currentMonth.setDate(25);
    const monthPrior = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 25);


    return [
        where('userId', '==', userID),
        where('recurring', '==', true)
    ];
}

export function expenseColumnWhereClauses(userID: string, category: string): QueryFieldFilterConstraint[] {

    const currentMonth = new Date();
    currentMonth.setDate(25);
    const monthPrior = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 25);

    return [
        where('userId', '==', userID),
        where('date', '>=', monthPrior),
        where('date', '<=', currentMonth),
        where('category', '==', category),
        where('recurring', '==', false)
    ];
}

export function expenseColumnRecurringWhereClauses(userID: string, category: string): QueryFieldFilterConstraint[] {
    return [
        where('userId', '==', userID),
        where('category', '==', category),
        where('recurring', '==', true)
    ];
}