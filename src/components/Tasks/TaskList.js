import React, { useState } from 'react';
import classes from './TaskList.module.css';
import Task from './Task';

const TaskList = (props) => {
    const [taskView, setTaskView] = useState('all');

    const getCompleteURL = () => {
        setTaskView('complete')
        props.onChangeTaskURL('http://localhost:5050/completed');
    };
    const getAllURL = () => {
        setTaskView('all')
        props.onChangeTaskURL('http://localhost:5050/');
    };
    const getPendingURL = () => {
        setTaskView('pending')
        props.onChangeTaskURL('http://localhost:5050/pending');
    };

    let taskList;

    if (taskView != 'all') {
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

    return (
        <div>
            <ul >
                {taskList}
            </ul>
            <button onClick={getCompleteURL}>Completed</button>
            <button onClick={getAllURL}>All</button>
            <button onClick={getPendingURL}>Pending</button>
        </div>
    );
};

export default TaskList;