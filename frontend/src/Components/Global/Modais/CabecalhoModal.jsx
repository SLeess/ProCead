import React from "react";
import { ModalHeader } from "flowbite-react";

const CabecalhoModal = ({titleModal}) => {
    return (
        <ModalHeader >
            <div className="flex justify-between items-center ml-4 mt-2">
                <h1 className="text-2xl font-bold text-gray-800">{titleModal}</h1>
            </div>
        </ModalHeader >
    );
}

export default CabecalhoModal;