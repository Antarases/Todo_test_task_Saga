import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Col } from 'react-bootstrap';

import './todo.component.css';

const Todo = ({
    username,
    email,
    text,
    status,
    image_path
}) => (
    <Grid
        className="todo"
        componentClass="section"
    >
        <span className="readiness">
            {
                status === 10 ?
                    <span>&#10004;</span> :
                    ''
            }
        </span>

        <span className="user-info">
            <div
                className="image"
                style={{
                    background: `url("${image_path}") 50% 50% no-repeat`
                }}
            >
                {console.log(image_path)}
            </div>

            <div className="user-name">
                {username}
            </div>

            <div className="email">
                {email}
            </div>
        </span>

        <Col
            className="text"
            lg={8} md={7} sm={6} xs={12}
        >
            {text}
        </Col>
    </Grid>
);

Todo.propTypes = {
    todos: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        text: PropTypes.string,
        status: PropTypes.number,
        image_path: PropTypes.string
    })
};

export default Todo;
