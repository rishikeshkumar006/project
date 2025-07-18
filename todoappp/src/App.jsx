import { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = task;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, task]);
    }

    setTask('');
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    // Cancel editing if deleting the task being edited
    if (editIndex === index) {
      setEditIndex(null);
      setTask('');
    }
  };

  const handleEdit = (index) => {
    setTask(todos[index]);
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
      <h1 style={{color:'black'}}>Todo List</h1>
       <input 
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task"
        style={{
          padding: '8px',
          width: '70%',
          marginRight: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
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
    color: '#333' // 👈 Add this line for dark text
  }}
>

            {todo}
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
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
