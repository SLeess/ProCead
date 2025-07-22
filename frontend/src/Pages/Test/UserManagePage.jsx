import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '@/Components/Global/LoaderPages/LoaderPages';
import { useAppContext } from '@/Contexts/AppContext';
import { useParams } from 'react-router-dom';

export default function UserManagePage() {
  const { token } = useAppContext();
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [editais, setEditais] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [globalRoles, setGlobalRoles] = useState([]);
  const [globalPermissions, setGlobalPermissions] = useState([]);
  const [editalRoles, setEditalRoles] = useState({}); // Cargos atribuídos por edital
  const [editalDirectPermissions, setEditalDirectPermissions] = useState({}); // Permissões DIRETAS atribuídas por edital

  // Estado para dados calculados/herdados (APENAS PARA LEITURA/UI)
  const [editalInheritedPermissions, setEditalInheritedPermissions] = useState({}); // Permissões HERDADAS de cargos por edital

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/users/${userId}/permissions`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            }
        });

        const res = await response.json();
        if (!res.success || !response.ok) {
          if(res.errors){
              res.errors.forEach(errorMessage => {
                  toast.error(errorMessage);
              });
          }
        }
        else{
          const { user, admin_access } = res.data;
          const { editais, global_roles, global_permissions} = admin_access;

          console.log(res);

          const responseEditais = await fetch(`/api/admin/editais`,{
              method: 'GET',
              headers: {
                  // 'Authorization': `Bearer ${token}`,
                  'Accept': 'application/json',
              }
          });

          const reseditais = await responseEditais.json();
          console.log(reseditais);

          setUser(user);
          setEditais(reseditais.editais);
          setAllRoles(reseditais.roles.map(role => role.name)); // Assumindo que allRoles vem como {id, name}
          setAllPermissions(reseditais.permissions.map(perm => perm.name)); // Assumindo que allPermissions vem como {id, name}
          
          setGlobalRoles(global_roles);
          setGlobalPermissions(global_permissions);

          // Transformar rolesAndPermissionsByEdital para o formato de estado
          const initialEditalRoles = {};
          const initialEditalPermissions = {};
          const aditionalEditalPermissions= {};
          Object.entries(editais).forEach(([editalId, data]) => {
            initialEditalRoles[editalId] = data.roles;
            initialEditalPermissions[editalId] = data.permissions;
            aditionalEditalPermissions[editalId] = data.aditional_permissions;
          });
          setEditalRoles(initialEditalRoles);
          setEditalDirectPermissions(aditionalEditalPermissions);
          setEditalInheritedPermissions(initialEditalPermissions);  
        }
      } catch (error) {
        toast.error("Erro ao carregar dados de permissões.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleGlobalRoleChange = (roleName, isChecked) => {
    setGlobalRoles(prev =>
      isChecked ? [...prev, roleName] : prev.filter(r => r !== roleName)
    );
  };

  const handleGlobalPermissionChange = (permName, isChecked) => {
    setGlobalPermissions(prev =>
      isChecked ? [...prev, permName] : prev.filter(p => p !== permName)
    );
  };

  const handleEditalRoleChange = (editalId, roleName, isChecked) => {
    setEditalRoles(prev => ({
      ...prev,
      [editalId]: isChecked
        ? [...(prev[editalId] || []), roleName]
        : (prev[editalId] || []).filter(r => r !== roleName),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
    //   await axios.post(`/api/admin/users/${userId}/permissions`, {
    //     global_roles: globalRoles,
    //     global_permissions: globalPermissions,
    //     edital_roles: editalRoles,
    //     edital_permissions: editalPermissions,
    //   });
    //   toast.success("Permissões e cargos atualizados com sucesso!");
    } catch (error) {
      toast.error("Erro ao salvar permissões.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditalDirectPermissionChange = (editalId, permName, isChecked) => {
    setEditalDirectPermissions(prev => ({
      ...prev,
      [editalId]: isChecked
        ? [...(prev[editalId] || []), permName]
        : (prev[editalId] || []).filter(p => p !== permName),
    }));
  };

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <section id="userManagePage">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Gerenciar Permissões de {user.email}</h1>

        <form onSubmit={handleSubmit}>
          {/* Permissões Globais */}
          <div className="mb-8 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Permissões Globais</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <h3 className="font-medium mb-1">Cargos Globais</h3>
                {allRoles.map(role => (
                  <div key={role} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`global-role-${role}`}
                      checked={globalRoles.includes(role)}
                      onChange={(e) => handleGlobalRoleChange(role, e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`global-role-${role}`}>{role}</label>
                  </div>
                ))}
              </div>
              <div className="md:col-span-2">
                <h3 className="font-medium mb-1">Permissões Globais Diretas</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allPermissions.map(perm => (
                    <div key={perm} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`global-perm-${perm}`}
                        checked={globalPermissions.includes(perm)}
                        onChange={(e) => handleGlobalPermissionChange(perm, e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`global-perm-${perm}`}>{perm}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Permissões por Edital */}
          <div className="mb-8 p-4 border rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Permissões por Edital</h2>
            {editais.map(edital => {
              // Permissões que o usuário tem DIRETAMENTE para este edital
              const currentDirectPermissions = editalDirectPermissions[edital.id] || [];
              // Permissões que o usuário HERDA DE CARGOS para este edital
              const currentInheritedPermissions = editalInheritedPermissions[edital.id] || [];

            
              return  (
              <div key={edital.id} className="mb-6 p-3 border rounded bg-gray-50">
                <h3 className="text-lg font-bold mb-2">{edital.descricao} (ID: {edital.id})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-1">Cargos ({edital.titulo})</h4>
                    {allRoles.map(role => (
                      <div key={role} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`edital-${edital.id}-role-${role}`}
                          checked={(editalRoles[edital.id] || []).includes(role)}
                          onChange={(e) => handleEditalRoleChange(edital.id, role, e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor={`edital-${edital.id}-role-${role}`}>{role}</label>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Permissões Diretas ({edital.titulo})</h4>
                    {allPermissions.map(perm => 
                      {  
                          // Verifica se a permissão é herdada
                          const isInherited = currentInheritedPermissions.includes(perm);
                          // Verifica se a permissão é atribuída diretamente
                          const isDirectlyAssigned = currentDirectPermissions.includes(perm);

                          // O checkbox deve estar marcado se for direta OU herdada
                          const isChecked = isDirectlyAssigned || isInherited;
                          // O checkbox deve ser desabilitado APENAS se for herdada
                          const isDisabled = isInherited;
                          return (
                              <div key={perm} className="flex items-center">
                              <input
                                  type="checkbox"
                                  id={`edital-${edital.id}-perm-${perm}`}
                                  checked={isChecked}
                                  disabled={isDisabled} // Desabilita se for herdada
                                  onChange={(e) => handleEditalDirectPermissionChange(edital.id, perm, e.target.checked)}
                                  className={`mr-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  // disabled={(editalPermissions[edital.id] || []).includes(perm)}
                                  // checked={(editalPermissions[edital.id] || editalAditionalPermissions[edital.id] ||[]).includes(perm)}
                                  // onChange={(e) => handleEditalPermissionChange(edital.id, perm, e.target.checked)}
                                  // className="mr-2"
                              />
                              <label htmlFor={`edital-${edital.id}-perm-${perm}`}>{perm}</label>
                              </div>
                          )
                      }
                    )}
                  </div>
                </div>
              </div>
            )})}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </section>
  );
}
