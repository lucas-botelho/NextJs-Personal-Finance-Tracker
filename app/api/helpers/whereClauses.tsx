import { QueryFieldFilterConstraint, Timestamp, and, or, where } from "firebase/firestore";
import { start } from "repl";

var startDate = new Date();
startDate.setHours(0, 0, 0, 0);
startDate.setDate(25);
startDate.setMonth(startDate.getMonth() - 1);
var endDate = new Date();
endDate.setHours(0, 0, 0, 0);
endDate.setDate(25);

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