import ModalBodyIncome from "../components/modal/modalBodyIncome";

export const modalBodyFactory = (view: string) => {

    let content: React.ReactNode = <div></div>;


    if (view === "income") {
        content = <ModalBodyIncome />
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