import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [date, setDate] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Auto-move overdue tasks to today on first load
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
    if (task.trim() === '') return;

    const selectedDate = date.trim() === ''
      ? new Date().toISOString().split('T')[0]
      : date;

    const newTask = {
      text: task,
      date: selectedDate,
      completed: false,
    };

    let updatedTodos;

    if (editIndex !== null) {
      updatedTodos = [...todos];
      updatedTodos[editIndex] = newTask;
      setEditIndex(null);
    } else {
      updatedTodos = [...todos, newTask];
    }

    // Sort tasks by date (ascending)
    updatedTodos.sort((a, b) => new Date(a.date) - new Date(b.date));

    setTodos(updatedTodos);
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

  const todayDate = new Date().toISOString().split('T')[0];

  return (
    <>
      {/* Global Styles */}
      <style>{`
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, #bdc3c7, #2c3e50);
          font-family: 'Poppins', sans-serif;
          color: #fff;
        }

        .header {
          text-align: center;
          padding: 40px 20px 20px;
        }

        .header h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .description {
          max-width: 800px;
          margin: auto;
          text-align: center;
          font-size: 1.1rem;
          line-height: 1.6;
          padding: 10px 20px;
          color: #f0f0f0;
        }

        .quote-section {
          margin-top: 30px;
          font-style: italic;
          color: #ffebcd;
          text-align: center;
          font-size: 1.05rem;
        }

        hr {
          border: 0;
          height: 1px;
          background: #eee;
          margin: 40px 0;
        }
      `}</style>

      {/* Content */}
      <div className="description">
        <p>
          A todo list is a simple yet powerful productivity tool that helps users stay organized, focused, and efficient.
          By allowing individuals to write down tasks, set priorities, and track progress, it reduces mental stress and improves
          time management. Whether used by students, professionals, or anyone managing daily activities, a todo list encourages
          goal setting, builds positive habits, and boosts motivation through the satisfaction of completing tasks.
          With features like task editing, reminders, and customizable layouts, a todo list adds great functional value
          to any website by enhancing the user’s ability to plan and accomplish more with ease.
        </p>
      </div>

      <div className="quote-section">
        <p>“The secret of getting ahead is getting started". — Mark Twain</p>
        <p>“Small daily improvements are the key to staggering long-term results.” – Robin Sharma</p>
        <p>“Don't wait. The time will never be just right.” – Napoleon Hill</p>
      </div>

      <hr />

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
          color: '#333',
        }}
      >
        <h1 style={{ color: '#222' }}>Todo List</h1>

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
          min={todayDate}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '10px',
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
                Task Completed
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
