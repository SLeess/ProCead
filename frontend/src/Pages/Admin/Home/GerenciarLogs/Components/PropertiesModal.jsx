import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import UpdateDetails from "./UpdateDetails";
import SimpleDetails from "./SimpleDetails";

export default function PropertiesModal({ isOpen, onClose, logData }) {
    if (!isOpen || !logData) return null;

    const renderDetails = () => {
        // Se for um evento de 'updated' com dados de antes e depois, mostra a comparação.
        if (logData.event === 'updated' && logData.properties?.old && logData.properties?.attributes) {
            return <UpdateDetails properties={logData.properties} />;
        }
        
        // Para 'created', 'deleted', ou qualquer outro evento, mostra a tabela simples.
        return <SimpleDetails properties={logData.properties} eventType={logData.event} />;
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="4xl"> {/* Aumentei o tamanho para 4xl */}
            <ModalHeader>
                Detalhes da Atividade #{logData.id}
            </ModalHeader>
            <ModalBody>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Descrição</h4>
                        <p className="text-gray-600 dark:text-gray-300">{logData.description}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Dados da Alteração</h4>
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
                           {renderDetails()}
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};