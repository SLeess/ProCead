import { useState } from "react";
import { useEffect } from "react";

function Users(props)
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUsers(){
            fetch("http://127.0.0.1:8000/api/users")
                .then((res) => res.json())
                .then((result) => {     
                    if(!result.success){
                        throw new Error(result.error);
                    }
                    return result;
                })
                .then(
                    (result) => {
                        setUsers(result.data.users);
                        setLoading(false);
                    },
                    (error) => {
                        setError(error);
                        setLoading(false);
                    }
                );
        }

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Erro: {error.message}</div>;
    }

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Users;