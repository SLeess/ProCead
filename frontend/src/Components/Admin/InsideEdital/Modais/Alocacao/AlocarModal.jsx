import { FormField, TextInput } from '@/Components/Global/ui/modals';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { List } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const AlocarModal = ({row}) => {
    const navigate = useNavigate();
    const handleButtonClick = (row) => {
        // console.log('Button clicked for row ID:', row.id);
        navigate(`user/${row.id}`);
    };
    return (
        <>
            <div className="flex items-center space-x-2">
                <button onClick={() => handleButtonClick(row)} id="acoes-icons">
                    <List id='edit-btn' />
                </button>
            </div>
        </>
    )
}

export default AlocarModal