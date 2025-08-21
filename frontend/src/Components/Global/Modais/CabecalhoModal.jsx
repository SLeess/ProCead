import React from "react";
import { ModalHeader } from "flowbite-react";
import "./CabecalhoModal.css";

const CabecalhoModal = ({titleModal}) => {
    return (
        <ModalHeader >
            <div id="header-modal">
                <h1 id="title-modal">{titleModal}</h1>
            </div>
        </ModalHeader >
    );
}

export default CabecalhoModal;