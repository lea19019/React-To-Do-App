import React, { useState } from 'react';
import classes from './Task.module.css';

const Task = (props) => {
    const { deleteTaskHandler } = props;

    const [isCompleted, setIsCompleted] = useState(props.isCompleted);

    const changeCompleteStatus = () => {
        setIsCompleted(!isCompleted);
    }


    // const deleteTaskHandler = async () => {
    //     try {
    //         const key = props.id
    //         const response = await fetch('http://localhost:5050/delete-task/' + key, {
    //             method: 'DELETE'
    //         });

    //         if (!response.ok) {
    //             throw new Error('Something went wrong!');
    //         };

    //         const data = await response.json();
    //         console.log(data);

    //     } catch (error) {
    //         console.log(error);
    //     }

    // };

    const deleteHandler = () => {
        deleteTaskHandler(props.id);
    };


    const updateTaskHandler = async () => {
        const id = props.id
        const taskData = {
            id: id,
            content: props.content,
            isCompleted: !props.isCompleted,
            dateCreation: props.dateCreation,
        };

        try {
            const response = await fetch('http://localhost:5050/edit-task/' + id, {
                method: 'PATCH',
                body: JSON.stringify(taskData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            };

            const data = await response.json();
            console.log(data);

        } catch (error) {
            console.log(error);
        }



    };

    let task;
    if (props.isAllView) {
        task = <div >
            <input type="checkbox" onClick={updateTaskHandler} onChange={changeCompleteStatus} checked={isCompleted} />
            <h2>{props.content}</h2>
            <h3>{props.dateCreation}</h3>
            <button onClick={deleteHandler}>X</button>
        </div>
    } else {
        task = <div >
            <h2>{props.content}</h2>
            <h3>{props.dateCreation}</h3>
        </div>
    }

    return (
        <li>{task}</li>
    );
};

export default Task;