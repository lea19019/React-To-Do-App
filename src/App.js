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
      console.log(loadedTasks)
      setTasks(loadedTasks);
    } catch (error) {
      // throw new Error('Something went wrong!');
      console.log(error)
    }

  }, []);

  useEffect(() => {
    fetchTasksHandler(taskURL);
  }, [fetchTasksHandler, taskURL]);

  const changeTaskURL = url => {
    console.log(url)
    setTaskURL(url);
  };

  return (
    <React.Fragment>
      <TaskList taskData={tasks} onChangeTaskURL={changeTaskURL}></TaskList>
      <NewTask></NewTask>
    </React.Fragment>
  );
}

export default App;
