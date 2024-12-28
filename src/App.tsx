import { useState } from 'react'
import './App.css'
type Todo = {
  value: string;
  readonly id: number;
};

function App() {
  const [text, setText] = useState('入力');
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos((todos) => [newTodo, ...todos]);
    setText('');
  };
  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value };
        }
        return todo;
      });

      return newTodos;
    });
  };
  return (
    <>
    <h1>TODOリスト</h1>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input type="text" value={text} onChange={(e) => handleChange(e)} />
      <input type="submit" value="追加" onSubmit={handleSubmit} />
    </form>
    <ul>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="text"
              value={todo.value}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
          </li>
        );
      })}
    </ul>
    </>
  )
}

export default App
