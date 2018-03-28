import React from 'react';
import Todo from '../todo/todo.component';

import {Grid} from 'react-bootstrap';

import './todo-preview.component.css';

const TodoPreview = ({
    isPreview,
    previewImgSrc,
    username,
    email,
    text
}) =>(
    isPreview && previewImgSrc &&
    username && email && text && (
        <Grid id="todo-preview">
            <div className="title">
                Todo Preview
            </div>

            <Todo
                username={username}
                email={email}
                text={text}
                status={0}
                image_path={previewImgSrc}
                isPreview={true}
            />
        </Grid>
    )
);

export default TodoPreview;
