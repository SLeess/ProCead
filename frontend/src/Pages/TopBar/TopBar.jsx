
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import styled from 'styled-components';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { toast } from "react-toastify";
import { NavigationContext } from '@/Contexts/NavigationContext';

const TopBarContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;

  &:hover .dropdown-content {
    display: block;
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  a {
    color: black;
    padding: 14px 18px;
    text-decoration: none;
    display: block;
    font-size: 1.1rem;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const LogoutButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function TopBar() {
  const { navigate } = useContext(NavigationContext);
  const { logout, token, user } = useContext(AppContext);
  async function handlerLogOut(){
          try {
              const res = await fetch('/api/logout', {
                  method: 'post',
                  headers:{
                      "Authorization": `Bearer ${token}`,
                  }
              });
  
              toast.success('Sessão encerrada.');
              logout();
              navigate('/admin/login');
              // window.location.reload();
          } catch (error) {
              toast.error(error);
          }
      }

  return (
      <TopBarContainer>
          <DropdownMenu>
              <DropdownButton>
                  <FaUserCircle />
                  <span>{user ? user.nome : ''}</span>
              </DropdownButton>
              <DropdownContent className="dropdown-content">
                  <LogoutButton to="/admin/login" onClick={() => handlerLogOut()}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                  </LogoutButton>
              </DropdownContent>
          </DropdownMenu>
      </TopBarContainer>
  );
}
