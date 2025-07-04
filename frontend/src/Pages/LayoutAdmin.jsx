import { Outlet } from "react-router-dom";
import styled from 'styled-components'; // 1. Importar styled-components
import Sidebar from "./Sidebar/Sidebar";
import MainAdminContainer from "./MainAdminContainer/MainAdminContainer";

// 2. Criar um container principal com Flexbox
const LayoutWrapper = styled.div`
  display: flex; /* Alinha os filhos (Sidebar e MainAdminContainer) lado a lado */
  background-color: #f0f2f5; /* Um fundo cinza claro para destacar os componentes */
  min-height: 100vh; /* Garante que o layout ocupe a altura toda da tela */
  gap: 20px; /* Adiciona um espaço entre a Sidebar e o MainAdminContainer */
`;

export default function LayoutAdmin() {
    return (
        // 3. Usar o novo Wrapper como o container principal
        <>
        <LayoutWrapper>
            <Sidebar />
            
            {/* 4. Colocar o Outlet e o ToastContainer DENTRO do MainAdminContainer */}
            <MainAdminContainer>
                <Outlet />
            </MainAdminContainer>
        </LayoutWrapper>
        </>
    );
}