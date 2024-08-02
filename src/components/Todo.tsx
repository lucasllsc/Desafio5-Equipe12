import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

interface TodoType {
  id: number;
  text: string;
  description: string;
  isCompleted: boolean;
  isEditing: boolean;
}

interface TodoProps {
  todo: TodoType;
  newText: string;
  newDescription: string;
  setNewText: (text: string) => void;
  setNewDescription: (description: string) => void;
  removeTodo: (id: number) => void;
  completeTodo: (id: number) => void;
  startEditing: (id: number) => void;
  saveTodo: (id: number, newText: string, newDescription: string) => void;
  cancelEditing: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, newText, newDescription, setNewText, setNewDescription, removeTodo, completeTodo, startEditing, saveTodo, cancelEditing }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) {
      return description;
    }
    return description.substring(0, maxLength) + " ...";
  };

  return (
    <div className="todo" style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={newText}
            required
            onChange={(e) => setNewText(e.target.value)}
          />
          <textarea
            value={newDescription}
            rows={4}
            required
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button className='cancel' onClick={() => cancelEditing(todo.id)}>Cancelar</button>
          <button className='save' onClick={()  => (newText.length > 3 && newDescription.length > 3) ? saveTodo(todo.id, newText, newDescription) : alert("Digite mais de 3 caracteres!")} >Salvar</button>
        </div>
      ) : (
        <div className="content">
          <h3>{todo.text}</h3>
          <p className="description">
            {isDescriptionExpanded ? todo.description : truncateDescription(todo.description, 40)}
            {todo.description.length > 40 && (
              <span className="expand-btn" onClick={handleExpandClick}>
                {isDescriptionExpanded ? " Ver menos." : "Ver mais."}
              </span>
            )}
          </p>
        </div>
      )}
      <div className='botoes'>      
        <button className='edit' onClick={() => startEditing(todo.id)}><FontAwesomeIcon icon={faPen}/></button>
        <button className='complete' onClick={() => completeTodo(todo.id)}><FontAwesomeIcon icon={faCheck}/></button>
        <button className='remove' onClick={() => removeTodo(todo.id)}><FontAwesomeIcon icon={faTrashCan}/></button>
      </div>
    </div>
  );
}

export default Todo;
