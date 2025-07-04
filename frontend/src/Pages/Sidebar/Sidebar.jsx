import React, { useContext, useState } from 'react';
import styled from 'styled-components'; import { Link } from 'react-router-dom';
import { AppContext } from '@/Contexts/AppContext'; // Importando a função can do contexto
// Ícones importados para os MENUS e submenus
import {
  FiGrid, FiChevronDown, FiChevronUp, FiSettings, FiFilePlus,
  FiTerminal, FiUsers, FiShield, FiUserCheck, FiKey, FiMapPin,
  FiLayers, FiBookOpen, FiClipboard, FiArchive, FiEdit,
  FiPieChart, FiHelpCircle, FiAward, FiBell, FiUserPlus,
  FiFileText, FiDatabase, FiHome, FiCheckSquare, FiFlag
} from 'react-icons/fi';



const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #002366;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const SidebarHeader = styled.div`
  padding: 20px 2vh;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #003388;
  flex-shrink: 0;
`;

const MenuListWrapper = styled.div`
  flex-grow: 1; 
  overflow-y: auto; 
  &::-webkit-scrollbar { width: 6px; }MainAdminContainer
  &::-webkit-scrollbar-track { background: transparent; }
  &::-webkit-scrollbar-thumb { background-color: #ffffff; border-radius: 10px; }
`;

const MenuSection = styled.div`
  padding: 8px 0;
`;

const SectionHeader = styled.div`
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${props => (props.$isOpen ? '#003388' : 'transparent')};
  border-radius: 8px;
  margin: 4px 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover { background-color: #003388; }

  span {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    color: white;
  }
`;

const SubMenuList = styled.div`
  overflow: hidden;
  max-height: ${props => (props.$isOpen ? '500px' : '0')};
  transition: max-height 0.3s ease-in-out;
  padding-left: 16px;
`;

const SubMenuItem = styled(Link)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  padding: 6px 16px 6px 30px;
  text-decoration: none;
  color: #c5cae9;
  cursor: pointer;
  margin: 4px 8px;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: background-color 0.2s, color 0.2s;

  &:hover { background-color: #003d99; }
  &.active { background-color: #1a73e8; color: white; font-weight: 500; }
`;

const Sidebar = () => {
  
  const { can } = useContext(AppContext);
   const menuData = [
  {
    title: 'Edital',
    icon: <FiFileText size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Configurações', icon: <FiSettings size={16} />, href: '/admin/configuracoes' },
      { name: 'Novo Edital', icon: <FiFilePlus size={16} />, href: '/admin/novo-edital' }
    ]
  },
  {
    title: 'Dados Globais',
    icon: <FiDatabase size={20} />,
    isInitiallyOpen: true,
    items: [
      { name: 'Logs', icon: <FiTerminal size={16} />, href: '/admin/logs' },
      { name: 'Usuários', icon: <FiUsers size={16} />, href: '/admin/usuarios' },
      { name: 'Administradores', icon: <FiShield size={16} />, href: '/admin/administradores' },
      { name: 'Perfis', icon: <FiUserCheck size={16} />, href: '/admin/perfis' },
      { name: 'Permissões', icon: <FiKey size={16} />, href: '/admin/permissoes' }
    ]
  },
  {
    title: 'Início',
    icon: <FiHome size={20} />,
    isInitiallyOpen: true,
    items: [
      { name: 'Campi', icon: <FiMapPin size={16} />, href: '/admin/campi' },
      { name: 'Modalidades', icon: <FiLayers size={16} />, href: '/admin/modalidades' },
      { name: 'Cursos', icon: <FiBookOpen size={16} />, href: '/admin/cursos' },
      { name: 'Quadro de Vagas', icon: <FiClipboard size={16} />, href: '/admin/quadro-de-vagas' }
    ]
  },
  {
    title: 'Avaliação',
    icon: <FiCheckSquare size={20} />,
    isInitiallyOpen: true,
    items: [
      { name: 'Alocação', icon: <FiArchive size={16} />, href: '/admin/alocacao' },
      
      can('visualizar-inscricoes') ?
        { name: 'Inscrições', icon: <FiEdit size={16} />, href: '/admin/inscricoes' }
        : null,

      { name: 'Cotas', icon: <FiPieChart size={16} />, href: '/admin/cotas' },
      { name: 'Recursos', icon: <FiHelpCircle size={16} />, href: '/admin/recursos' }
    ]

  },
  {
    title: 'Finalização',
    icon: <FiFlag size={20} />,
    isInitiallyOpen: true,
    items: [
      { name: 'Classificação', icon: <FiAward size={16} />, href: '/admin/classificacao' },
      { name: 'Chamadas', icon: <FiBell size={16} />, href: '/admin/chamadas' },
      { name: 'Matrículas', icon: <FiUserPlus size={16} />, href: '/admin/matriculas' }
    ]
  },
];
  const [openSections, setOpenSections] = useState(() => {
    const initialState = {};
    menuData.forEach(section => { initialState[section.title] = section.isInitiallyOpen; });
    return initialState;
  });


  const [activeItem, setActiveItem] = useState('Campi');

  const handleToggleSection = title => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  }

  return (
    <SidebarContainer>
      <SidebarHeader>
        <img src="/img/logo_cead_bg_white.png" style={{ marginRight: "10px" }} width={"50px"} />
        PROCEAD
      </SidebarHeader>
      <MenuListWrapper>
        {menuData.map(section => (
          <MenuSection key={section.title}>
            <SectionHeader $isOpen={openSections[section.title]} onClick={() => handleToggleSection(section.title)}>
              <span>
                {section.icon}
                {section.title}
              </span>
              {/* LÓGICA ATUALIZADA AQUI: Adicionado color="white" */}
              {openSections[section.title]
                ? <FiChevronUp color="white" />
                : <FiChevronDown color="white" />
              }
            </SectionHeader>
            <SubMenuList $isOpen={openSections[section.title]}>
              {section.items.filter((link) => link !== null).map(item => (
                <SubMenuItem
                  key={item.name}
                  to={item.href}
                  className={activeItem === item.name ? 'active' : ''}
                  onClick={() => handleItemClick(item.name)}
                >
                  {item.icon}
                  {item.name}
                </SubMenuItem>
              ))}
            </SubMenuList>
          </MenuSection>
        ))}
      </MenuListWrapper>
    </SidebarContainer>
  );
};

export default Sidebar;