const StatusEditalPill = ({ children }) => {
    let bgColor, textColor;

    if (children == 'Em andamento' || children == 'Em Avaliação') {
        bgColor = 'bg-[#D5ECDA] dark:bg-[#D5ECDA]';
        textColor = 'text-[#124F00] dark:text-[#124F00]';
    } else if (children == 'Finalizado') {
        bgColor = 'bg-[#FFD8DC] dark:bg-[#FFD8DC]';
        textColor = 'text-[#DC3545] dark:text-[#DC3545]';
    } 
    // else {
    //     bgColor = 'bg-green-300 dark:bg-green-900';
    //     textColor = 'text-green-900 dark:text-green-200';
    // }

    return (
        <span className={`px-3 py-1 text-sm not-italic font-bold leading-5 rounded-full ${bgColor} ${textColor} border border-solid  border-[#F2F5F7]`}>
        {children}
        </span>
    );
}

export default StatusEditalPill;