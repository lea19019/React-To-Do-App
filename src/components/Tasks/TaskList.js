import React, { useState } from 'react';
import classes from './TaskList.module.css';
import Button from '../UI/Button';
import Task from './Task';

const TaskList = (props) => {
    const [taskView, setTaskView] = useState('all');

    // Depending the button we press we will send a URL to the App.js file to display
    // the desired view.
    const getCompleteURL = () => {
        setTaskView('complete')
        props.onChangeTaskURL('http://localhost:5050/completed'); // Completed view
    };
    const getAllURL = () => {
        setTaskView('all')
        props.onChangeTaskURL('http://localhost:5050/'); // All view
    };
    const getPendingURL = () => {
        setTaskView('pending')
        props.onChangeTaskURL('http://localhost:5050/pending'); // Pending view
    };

    let taskList;

    // Note: we will be able to update or delete the task only on the all view, this is why
    // we will pass some extra props to the all view. 
    if (taskView !== 'all') {
        taskList = props.taskData.map((task) => (
            <Task
                key={task.id}
                content={task.content}
                dateCreation={task.dateCreation}
                isCompleted={task.isCompleted}
                isAllView={false}
            />
        ));
    } else {
        taskList = props.taskData.map((task) => (
            <Task
                key={task.id}
                id={task.id}
                content={task.content}
                dateCreation={task.dateCreation}
                isCompleted={task.isCompleted}
                isAllView={true}
                deleteTaskHandler={props.deleteTaskHandler}
            />
        ));
    }

    // Display our task list and our buttons.
    return (
        <div>
            <ul className={classes.taskList}>
                {taskList}
            </ul>
            <Button onClick={getCompleteURL}>Completed</Button>
            <Button onClick={getAllURL}>All</Button>
            <Button onClick={getPendingURL}>Pending</Button>
        </div>
    );
};

export default TaskList;