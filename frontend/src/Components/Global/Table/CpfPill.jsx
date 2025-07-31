export default function CpfPill({cpf}){
    return (
        <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gray-300 outline-1 text-black font-mono`}>
            {cpf}
        </span>
    )
}