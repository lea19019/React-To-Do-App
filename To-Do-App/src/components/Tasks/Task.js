import React, { useState } from 'react';
import classes from './Task.module.css';

const Task = (props) => {
    const { deleteTaskHandler } = props;

    const [isCompleted, setIsCompleted] = useState(props.isCompleted);

    const changeCompleteStatus = () => {
        setIsCompleted(!isCompleted);
    }

    // If user wants to delete the task this will pass the task id and call the delete function.
    const deleteHandler = () => {
        deleteTaskHandler(props.id);
    };

    // Asynchronous function to update our task, and with this we complet our CRUD operations.
    const updateTaskHandler = async () => {
        const id = props.id
        // Save our data in an object.
        const taskData = {
            id: id,
            content: props.content,
            isCompleted: !props.isCompleted,
            dateCreation: props.dateCreation,
        };

        try {
            const response = await fetch(`http://localhost:5050/edit-task/${id}`, { // We pass our id in the params
                method: 'PATCH',
                body: JSON.stringify(taskData), // Stringify our data so it can be read in JSON
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Same mechanism to check for errors.
            if (!response.ok) {
                throw new Error('Something went wrong!');
            };

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    let taskDate = props.dateCreation;

    let task;
    // Depending on the view we are, set in TaskList.js file we will display one or the other task view.
    // The all view will have the ability to delete or update data.
    if (props.isAllView) {
        task = <div className={classes.allView}>
            <input type="checkbox" onClick={updateTaskHandler} onChange={changeCompleteStatus} checked={isCompleted} />
            <section>
                <h2>{props.content}</h2>
                <p>{taskDate}</p>
            </section>
            <button onClick={deleteHandler}>X</button>
        </div>
    } else {
        task = <div >
            <h2>{props.content}</h2>
            <p>{taskDate}</p>
        </div>
    }

    return (
        <li>{task}</li>
    );
};

export default Task;