import React, { useState } from 'react';
import classes from './NewTask.module.css';

const NewTask = (props) => {
    const [contentVal, setContentVal] = useState('');
    const contentValHandler = (e) => {
        setContentVal(e.target.value);
    };
    function submitHandler(e) {
        e.preventDefault();
        const taskData = {
            content: contentVal
        }
        props.addTaskHandler(taskData);
        setContentVal('');
    }
    return <form onSubmit={submitHandler}>
        <div>
            <label htmlFor='content'>Task:</label>
            <input type='text' id='content' onChange={contentValHandler} value={contentVal} />
        </div>
        <button>Add Task</button>
    </form>
};

export default NewTask;