export default function UserListItem ({ user, onClick, isActive }){ 
    return (
        <li 
            onClick={onClick}
            className={`p-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${isActive ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-semibold' : 'dark:text-gray-300'}`}
        >
            <p className="font-medium truncate">{user.nome}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
        </li>
    );
}