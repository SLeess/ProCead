import { Search } from "lucide-react";

export default function SearchRowsTable({globalFilter, setGlobalFilter})
{
    return (
        <div id="table-search">
            <input
            id="search-input"
            type="text"
            value={globalFilter ?? ''}
            onChange={e => setGlobalFilter(e.target.value)}
            placeholder="Pesquisar..."
            />
            <span id="search-icon">
                <Search />
            </span>
        </div>
    );
}