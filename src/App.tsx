import { useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';

interface TodoType {
  id: number;
  text: string;
  description: string;
  isCompleted: boolean;
  isEditing: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoType[]>([
    {
      id: 1,
      text: "Exemplo de Tarefa",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      isCompleted: false,
      isEditing: false,
    }
  ]);

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("Asc");
  const [editingTodo, setEditingTodo] = useState<TodoType | null>(null);

  const addTodo = (text: string, description: string) => {
    const newTodos: TodoType[] = [
      ...todos, 
      {
        id: Math.floor(Math.random() * 10000),
        text,
        description,
        isCompleted: false,
        isEditing: false,
      },
    ];

    setTodos(newTodos);
  };


  const removeTodo = (id: number) => {
    const newTodos: TodoType[] = todos.filter(todo => todo.id !== id ? todo : null);
    setTodos(newTodos);
  };

  const completeTodo = (id: number) => {
    const newTodos: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
  };

  const startEditing = (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setEditingTodo({ ...todo });
      const newTodos: TodoType[] = todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : todo
      );
      setTodos(newTodos);
    }
  };

  const saveTodo = (id: number, newText: string, newDescription: string) => {
    const newTodos: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, description: newDescription, isEditing: false } : todo
    );
    setTodos(newTodos);
    setEditingTodo(null);
  };

  const cancelEditing = (id: number) => {
    const newTodos: TodoType[] = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: false } : todo
    );
    setTodos(newTodos);
    setEditingTodo(null);
  };

  return (
    <div className='app'>
      <h1>MyTasks</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter(todo =>
            filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted
          )
          .filter(todo =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort((a, b) =>
            sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
          )
          .map(todo => (
            <Todo
              key={todo.id}
              todo={todo}
              newText={editingTodo && editingTodo.id === todo.id ? editingTodo.text : todo.text}
              newDescription={editingTodo && editingTodo.id === todo.id ? editingTodo.description : todo.description}
              setNewText={(text) => setEditingTodo(editingTodo ? { ...editingTodo, text } : null)}
              setNewDescription={(description) => setEditingTodo(editingTodo ? { ...editingTodo, description } : null)}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
              startEditing={startEditing}
              saveTodo={saveTodo}
              cancelEditing={cancelEditing}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
    </div>
  );
}

export default App;
