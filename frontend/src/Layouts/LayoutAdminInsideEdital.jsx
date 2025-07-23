import { Outlet } from "react-router-dom";
import styled from 'styled-components'; // 1. Importar styled-components
import Sidebar from "../Components/Admin/InsideEdital/Sidebar/Sidebar";

// 2. Criar um container principal com Flexbox
const LayoutWrapper = styled.div`
  display: flex; /* Alinha os filhos (Sidebar e MainAdminContainer) lado a lado */
  background-color: #f0f2f5; /* Um fundo cinza claro para destacar os componentes */
  min-height: 100vh; /* Garante que o layout ocupe a altura toda da tela */
  gap: 20px; /* Adiciona um espaço entre a Sidebar e o MainAdminContainer */
`;

const BoxContainer = styled.div`
  width: 100%;
  height: 94vh;
  background-color: #f0f2f5; /* Sets the background to white */
  border-radius: 15px; /* Rounds the corners */
  
  /* Adds a subtle shadow to give it some depth.
    - 0px horizontal offset
    - 4px vertical offset
    - 12px blur radius
    - A very light black color (rgba(0, 0, 0, 0.05)) for the shadow
  */
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow-y: auto; /* Add this line to enable vertical scrolling when content overflows */
  
  /* Optional: Add some padding so content doesn't touch the edges */
  padding: 20px;
  box-sizing: border-box; /* Ensures padding is included in the total width/height */
  margin: 3vh 2vh 2vh 0vh;
  // outline: 2px solid black
`;

export default function LayoutAdminInsideEdital() {
    return (
        // 3. Usar o novo Wrapper como o container principal
        <>
        <LayoutWrapper>
            <Sidebar />
            
            {/* 4. Colocar o Outlet e o ToastContainer DENTRO do MainAdminContainer */}
            <BoxContainer>
                <Outlet />
            </BoxContainer>
        </LayoutWrapper>
        </>
    );
}