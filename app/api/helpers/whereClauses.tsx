import { QueryFieldFilterConstraint, Timestamp, and, or, where } from "firebase/firestore";

var startDate = new Date();
startDate.setHours(0, 0, 0, 0);
startDate.setDate(25);
var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 25);

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

export function monthlyTakyawayCalculationWhereClauses(userID: string): any[] {
    return [
        and(
            or(
                where('userId', '==', userID),
                where("date", ">=", Timestamp.fromDate(startDate)),
                where("date", "<=", Timestamp.fromDate(endDate))),
            or(
                where('userId', '==', userID),
                where('recurring', '==', true)
            )
        )
    ];
}