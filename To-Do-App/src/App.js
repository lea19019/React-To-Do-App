import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import TaskList from './components/Tasks/TaskList';
import NewTask from './components/NewTask/NewTask';

function App() {
  // This state declarations will help us display the data in the UI everytime we load, reaload or change the data
  const [tasks, setTasks] = useState([]);
  const [taskURL, setTaskURL] = useState('http://localhost:5050/');

  // Asynchronous function to consume the data sent from my Task Restful API.
  const fetchTasksHandler = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      // Checking for errors, if we don't get an ok status we sent the error.
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      // We wait for the data
      const data = await response.json();
      const loadedTasks = [];

      // Save the data in an array of objects.
      for (const key in data) {
        loadedTasks.push({
          id: data[key]._id,
          content: data[key].content,
          isCompleted: data[key].isCompleted,
          dateCreation: data[key].dateCreation
        });
      }
      setTasks(loadedTasks);    // We save our data to display it in the UI.

    } catch (error) {     // We catch the error, this is something you'll see several times in the code.
      console.log(error)
    }

  }, []);

  // Asynchronous function to delete a Task given the taskId.
  const deleteTaskHandler = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5050/delete-task/${taskId}`, {
        method: 'DELETE'
      });   // We pass te taskId throug the params, and just as a point to remember
      // DELETE methods don't have a body, just pass the id throug the params.

      // Our error mechanisms here again.
      if (!response.ok) {
        throw new Error('Something went wrong!');
      };

      const data = await response.json();

      // Here we just simply remove our task from our tasks, and we know it will also be removed from
      // our database because otherwise the code won't get until here due to our error handling.
      setTasks(tasks => {
        return tasks.filter(task => task.id !== taskId)
      });
    }
    catch (error) {
      console.log(error);
    }
  };

  // Asynchronous function to add a task, we receive the task data.
  const addTaskHandler = async (taskData) => {
    try {
      const response = await fetch('http://localhost:5050/add-task', {
        method: 'POST',
        body: JSON.stringify(taskData), // Remember to stringify your data
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      fetchTasksHandler(taskURL); // Now call our display function to show our updated data.

    }
    catch (error) {
      console.log(error);
    }
  }

  // Our useEffect will allow us to update our UI because everytime taskURL or fetchTaskHandler changes or
  // or is called the function will run.
  useEffect(() => {
    fetchTasksHandler(taskURL);
  }, [fetchTasksHandler, taskURL]);

  // This will receive a URL to displa either all, pending or completed view.
  const changeTaskURL = url => {
    setTaskURL(url);
  };

  // We call our UI here to display the data.
  return (
    <React.Fragment>
      <h1>React To Do App</h1>
      <TaskList taskData={tasks} onChangeTaskURL={changeTaskURL} deleteTaskHandler={deleteTaskHandler} />
      <NewTask addTaskHandler={addTaskHandler}></NewTask>
    </React.Fragment>
  );
}

export default App;
