import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3000/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post('http://localhost:3000/api/tasks', {
      description,
      completed: false,
    });
    setTasks([...tasks, response.data]);
    setDescription('');
  };

  const UpdateTask = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, updatedTask);
    setTasks(
      tasks.map((list) => (list._id === task._id ? response.data : list))
    );
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };


  return (
    <>

      <div>
        <h1>To-Do List</h1>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => UpdateTask(task)}
              />
              {task.description}
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
