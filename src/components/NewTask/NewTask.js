import React, { useState } from 'react';
import Button from '../UI/Button';
import classes from './NewTask.module.css';

const NewTask = (props) => {
    const [contentVal, setContentVal] = useState('');

    // Everytime the values in input changes we want to update our contentVal
    // this will allow us to send the data to our submitHandler and then reset
    // the value.
    const contentValHandler = (e) => {
        setContentVal(e.target.value);
    };

    // Here we prepare our data to be passed as a variable and then we can send
    // to our database.
    function submitHandler(e) {
        e.preventDefault();
        const taskData = {
            content: contentVal
        }
        // We need to call our function that resides in the App.js file
        props.addTaskHandler(taskData);
        setContentVal(''); // Reset the values.
    }

    // Our form to manage our added tasks.
    return <form className={classes.taskForm} onSubmit={submitHandler}>
        <div>
            <label htmlFor='content'>Task:</label>
            <input type='text' id='content' onChange={contentValHandler} value={contentVal} />
        </div>
        <Button type="submit">Add Task</Button>
    </form>
};

export default NewTask;