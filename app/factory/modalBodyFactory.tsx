import ModalBodyExpense from "../components/modal/modalBodyExpense";
import ModalBodyIncome from "../components/modal/modalBodyIncome";
import ModalBodySaving from "../components/modal/modalBodySavingIn";

export const modalBodyFactory = (view: string, userID: string) => {

    let content: React.ReactNode = <div></div>;


    if (view === "income") {
        content = <ModalBodyIncome userID={userID} />
    }

    if (view === "expense") {
        content = <ModalBodyExpense userID={userID} />
    }

    if (view === "savingIn") {
        content = <ModalBodySaving userID={userID} isIncome={true} />
    }

    if (view === "savingOut") {
        content = <ModalBodySaving userID={userID} isIncome={false} />
    }


    return content;
}