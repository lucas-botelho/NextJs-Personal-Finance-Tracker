import ModalBodyIncome from "../components/modal/modalBodyIncome";

export const modalBodyFactory = (view: string, userID: string) => {

    let content: React.ReactNode = <div></div>;


    if (view === "income") {
        content = <ModalBodyIncome userID={userID} />
    }

    // if(view === "expense"){
    //     content = <ModalBodyExpense />
    // }

    // if(view === "savingIn"){
    //     content = <ModalBodySavingIn />
    // }

    // if(view === "savingOut"){
    //     content = <ModalBodySavingOut />
    // }


    return content;
}