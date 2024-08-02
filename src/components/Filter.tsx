import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons/faCaretUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface FilterProps {
  filter: string;
  setFilter: (value: string) => void;
  setSort: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter, setSort }) => {
  return (
    <div className="filter">
      <h2>Filtrar</h2>
      <div className="filter-options">
        <div>
          <p>Status:</p>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incomplete">Incompletas</option>
          </select>
        </div>
        <div>
          <p>Ordem alfabética:</p>
          <button onClick={() => setSort("Asc")}><FontAwesomeIcon icon={faCaretUp} /></button>
          <button onClick={() => setSort("Desc")}><FontAwesomeIcon icon={faCaretDown} /></button>
        </div>
      </div>    
    </div>
  );
}

export default Filter;
