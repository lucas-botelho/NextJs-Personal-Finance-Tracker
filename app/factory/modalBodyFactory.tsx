import ModalBodyExpense from "../components/modal/modalBodyExpense";
import ModalBodyIncome from "../components/modal/modalBodyIncome";
import ModalBodySavingIn from "../components/modal/modalBodySavingIn";
import ModalBodySavingOut from "../components/modal/modalBodySavingOut";

export const modalBodyFactory = (view: string, userID: string) => {

    let content: React.ReactNode = <div></div>;


    if (view === "income") {
        content = <ModalBodyIncome userID={userID} />
    }

    if (view === "expense") {
        content = <ModalBodyExpense userID={userID} />
    }

    if (view === "savingIn") {
        content = <ModalBodySavingIn userID={userID} />
    }

    if (view === "savingOut") {
        content = <ModalBodySavingOut userID={userID} />
    }


    return content;
}