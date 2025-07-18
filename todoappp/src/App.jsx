import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [motivationalMessage, setMotivationalMessage] = useState('');


  // Auto-move overdue tasks to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const updatedTodos = todos.map((todo) => {
      if (!todo.completed && todo.date < today) {
        return { ...todo, date: today };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }, []);

  const handleAddOrUpdate = () => {
    if (task.trim() === '' || date.trim() === '') return;

    const newTask = {
      text: task,
      date: date,
      completed: false
    };

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTask;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, newTask]);
    }

    setTask('');
    setDate('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    if (editIndex === index) {
      setEditIndex(null);
      setTask('');
      setDate('');
    }
  };

  const handleEdit = (index) => {
    setTask(todos[index].text);
    setDate(todos[index].date);
    setEditIndex(index);
  };

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '50px auto',
        padding: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: 'black' }}>Todo List</h1>

      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        style={{
          padding: '8px',
          width: '60%',
          marginRight: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: '8px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginRight: '10px'
        }}
      />
      <button onClick={handleAddOrUpdate} style={{ padding: '8px 16px' }}>
        {editIndex !== null ? 'Update' : 'Add'}
      </button>

      <ul style={{ listStyleType: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '5px',
              color: '#333',
            }}
          >
            <div><strong>{todo.text}</strong></div>
            <div style={{ fontSize: '0.9em', color: '#888' }}>
              Due: {todo.date}
            </div>
            <button
              onClick={() => handleEdit(index)}
              style={{ marginLeft: '10px' }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: '5px' }}
            >
              task completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
