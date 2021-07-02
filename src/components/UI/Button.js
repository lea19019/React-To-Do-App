import React from 'react';
import classes from './Button.module.css';

// Simple button component to simplify our UI display.
const Button = (props) => {
    return <button className={classes.button} type={props.type || 'button'} onClick={props.onClick}>{props.children}</button>
};

export default Button;