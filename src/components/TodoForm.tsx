import React, { useState, FormEvent } from 'react';

interface TodoFormProps {
  addTodo: (value: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [value, setValue] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value || !description) return;
    addTodo(value, description);
    setValue("");
    setDescription("");
  };

  const handleCancel = () => {
    setValue("");
    setDescription("");
  };

  return (
    <div className="todo-form">
      <h2>Criar tarefa</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Digite um título"
          value={value}
          required
          onChange={(e) => setValue(e.target.value)} 
        />
        <textarea
          placeholder="Digite uma descrição para a tarefa"
          value={description}
          rows = {4}
          required
          onChange={(e) => setDescription(e.target.value)} 
        />
        <button type="button" onClick={handleCancel}>Cancelar</button>
        <button type="submit">Criar tarefa</button>
      </form>
    </div>
  );
};

export default TodoForm;
