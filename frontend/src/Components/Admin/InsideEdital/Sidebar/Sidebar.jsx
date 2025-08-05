import React, { useContext, useState } from 'react';
import { AppContext } from '@/Contexts/AppContext'; // Importando a função can do contexto
import { useNavigate, useParams } from 'react-router-dom';
import './Sidebar.css';
// Ícones importados para os MENUS e submenus
import {
  FiGrid, FiChevronDown, FiChevronUp, FiSettings, FiFilePlus,
  FiTerminal, FiUsers, FiShield, FiUserCheck, FiKey, FiMapPin,
  FiLayers, FiBookOpen, FiClipboard, FiArchive, FiEdit,
  FiPieChart, FiHelpCircle, FiAward, FiBell, FiUserPlus,
  FiFileText, FiDatabase, FiHome, FiCheckSquare, FiFlag
} from 'react-icons/fi';
import { List } from 'lucide-react';

const Sidebar = () => {
  
  const { hasGlobalPermission } = useContext(AppContext);
  const { editalId } = useParams();
  const navigate = useNavigate();
  const menuData = [
  {
    title: 'Edital',
    icon: <FiFileText size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Configurações', icon: <FiSettings size={16} />, href: `/admin/edital/${editalId}/configuracoes` },
    ]
  },
  {
    title: 'Dados Globais',
    icon: <FiDatabase size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Logs', icon: <FiTerminal size={16} />, href: `/admin/edital/${editalId}/logs` },
      { name: 'Usuários', icon: <FiUsers size={16} />, href: `/admin/edital/${editalId}/usuarios` },
      // { name: 'Administradores', icon: <FiShield size={16} />, href: `/admin/edital/${editalId}/administradores` },
      { name: 'Perfis', icon: <FiUserCheck size={16} />, href: `/admin/edital/${editalId}/perfis` },
      // { name: 'Permissões', icon: <FiKey size={16} />, href: `/admin/edital/${editalId}/permissoes` }
    ]
  },
  {
    title: 'Início',
    icon: <FiHome size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Polos', icon: <FiMapPin size={16} />, href: `/admin/edital/${editalId}/polos` },
      { name: 'Modalidades', icon: <FiLayers size={16} />, href: `/admin/edital/${editalId}/modalidades` },
      { name: 'Cursos', icon: <FiBookOpen size={16} />, href: `/admin/edital/${editalId}/cursos` },
      { name: 'Disciplinas', icon: <List size={16} />, href: `/admin/edital/${editalId}/disciplinas` },
      { name: 'Quadro de Vagas', icon: <FiClipboard size={16} />, href: `/admin/edital/${editalId}/quadro-vagas` }
    ]
  },
  {
    title: 'Avaliação',
    icon: <FiCheckSquare size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Alocação', icon: <FiArchive size={16} />, href: `/admin/edital/${editalId}/alocacao` },
      
      hasGlobalPermission('visualizar-inscricoes') ?
        { name: 'Inscrições', icon: <FiEdit size={16} />, href: `/admin/edital/${editalId}/inscricoes` }
        : null,

      { name: 'Cotas', icon: <FiPieChart size={16} />, href: `/admin/edital/${editalId}/cotas` },
      { name: 'Recursos', icon: <FiHelpCircle size={16} />, href: `/admin/edital/${editalId}/recursos` }
    ]

  },
  {
    title: 'Finalização',
    icon: <FiFlag size={20} />,
    isInitiallyOpen: false,
    items: [
      { name: 'Classificação', icon: <FiAward size={16} />, href: `/admin/edital/${editalId}/classificacao` },
      { name: 'Chamadas', icon: <FiBell size={16} />, href: `/admin/edital/${editalId}/chamadas` },
      { name: 'Matrículas', icon: <FiUserPlus size={16} />, href: `/admin/edital/${editalId}/matriculas` }
    ]
  },
];
  const [openSections, setOpenSections] = useState(() => {
    const initialState = {};
    menuData.forEach(section => { initialState[section.title] = section.isInitiallyOpen; });
    return initialState;
  });


  const [activeItem, setActiveItem] = useState('Inscrições');

  const handleToggleSection = title => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleItemClick = (itemName, path) => {
    setActiveItem(itemName);
    navigate(path);
  }

  return (
    <div id='Sidebar-admin' className="w-67 h-screen bg-[var(--admin-sidebar)] flex flex-col font-sans rounded-tr-[15px] rounded-br-[15px]">
      <div
        className="p-5 text-2xl font-bold text-white flex items-center flex-shrink-0 cursor-pointer"
        onClick={() => navigate(`/admin`)}
      >
        <img src="/img/logo_cead_bg_white.png" className="mr-2.5" width="50px" />
        PROCEAD
      </div>
      <div className="flex-grow overflow-y-auto scrollbar scrollbar-thumb-white scrollbar-track-transparent scrollbar-w-[6px]">
        {menuData.map(section => (
          <div key={section.title} className="py-2">
            <div
              className={`px-4 py-2.5 flex items-center justify-between cursor-pointer rounded-md m-1 mx-2 transition-colors duration-50 ease-in-out hover:bg-[var(--admin-sidebar-hover-and-select)]`}
              onClick={() => handleToggleSection(section.title)}
            >
              <span className="flex items-center gap-3 text-[0.95rem] text-white">
                {section.icon}
                {section.title}
              </span>
              {openSections[section.title]
                ? <FiChevronUp color="white" />
                : <FiChevronDown color="white" />
              }
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out pl-4 ${openSections[section.title] ? 'max-h-[500px]' : 'max-h-0'}`}
            >
              {section.items.filter((link) => link !== null).map(item => (
                <div
                  key={item.name}
                  className={`flex justify-start items-center gap-3 py-1.5 pr-4 pl-[30px] text-[#ffffff] cursor-pointer m-1 mx-2 rounded-md text-[1rem] transition-colors duration-200 hover:bg-[var(--admin-sidebar-hover-and-select)] ${activeItem === item.name ? 'bg-[var(--admin-sidebar-hover-and-select)] text-white font-medium' : ''}`
                  }
                  onClick={() => handleItemClick(item.name, item.href)}
                >
                  {item.icon}
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;