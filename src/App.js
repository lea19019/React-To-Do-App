import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskList from './components/Tasks/TaskList';
import NewTask from './components/NewTask/NewTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskURL, setTaskURL] = useState('http://localhost:5050/');

  const fetchTasksHandler = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const loadedTasks = [];

      for (const key in data) {
        loadedTasks.push({
          id: data[key]._id,
          content: data[key].content,
          isCompleted: data[key].isCompleted,
          dateCreation: data[key].dateCreation
        });
      }
      setTasks(loadedTasks);
    } catch (error) {
      // throw new Error('Something went wrong!');
      console.log(error)
    }

  }, []);

  const deleteTaskHandler = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5050/delete-task/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      };

      const data = await response.json();

      setTasks(tasks => {
        return tasks.filter(task => task.id !== taskId)
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  const addTaskHandler = async (taskData) => {
    try {
      const response = await fetch('http://localhost:5050/add-task', {
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      fetchTasksHandler(taskURL);

    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTasksHandler(taskURL);
  }, [fetchTasksHandler, taskURL]);

  const changeTaskURL = url => {
    setTaskURL(url);
  };

  return (
    <React.Fragment>
      <TaskList taskData={tasks} onChangeTaskURL={changeTaskURL} deleteTaskHandler={deleteTaskHandler} />
      <NewTask addTaskHandler={addTaskHandler}></NewTask>
    </React.Fragment>
  );
}

export default App;
