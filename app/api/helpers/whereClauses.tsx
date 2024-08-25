import { QueryFieldFilterConstraint, Timestamp, and, or, where } from "firebase/firestore";

var startDate = new Date();
if (startDate.getDate() < 25) startDate.setMonth(startDate.getMonth() - 1);
startDate.setHours(0, 0, 0, 0);
startDate.setDate(25);
var endDate = new Date();
endDate.setHours(23, 59, 0, 0);
if (endDate.getMonth() === startDate.getMonth()) endDate.setMonth(endDate.getMonth() + 1);
endDate.setDate(24);

export function monthlyStatusWhereClauses(userID: string): QueryFieldFilterConstraint[] {
    return [
        where('userId', '==', userID),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
        where('recurring', '==', false)
    ];
}

export function monthlyStatusRecurringWhereClauses(userID: string): QueryFieldFilterConstraint[] {
    return [
        where('userId', '==', userID),
        where('recurring', '==', true)
    ];
}

export function expenseColumnWhereClauses(userID: string, category: string): QueryFieldFilterConstraint[] {
    return [
        where('userId', '==', userID),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
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

export function monthlyTakyawayNonRecurringWhereClauses(userID: string): any[] {
    return [
        where('userId', '==', userID),
        where('recurring', '==', false),
        where('date', '>=', Timestamp.fromDate(startDate)),
        where('date', '<=', Timestamp.fromDate(endDate))
    ];
}

export function monthlyTakyawayRecurringWhereClauses(userID: string): any[] {
    return [
        where('userId', '==', userID),
        where('recurring', '==', true),
    ];
}