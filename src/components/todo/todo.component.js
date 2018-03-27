import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Col } from 'react-bootstrap';

import EditTodoButton from '../edit-todo-button/edit-todo-button.component';

import './todo.component.css';


let Todo = ({
    id,
    username,
    email,
    text,
    status,
    image_path,
    isAdmin
}) => {
    let completed;
    if(status === 0){
        completed = false;
    } else if(status === 10){
        completed = true;
    }

    return (
        <Grid
            className="todo"
            componentClass="section"
        >
            <span className="user-info">
                <div
                    className="image"
                    style={{
                        background: `url("${image_path}") 50% 50% no-repeat`
                    }}
                >
                </div>

                <div className="user-name">
                    {username}
                </div>

                <div className="email">
                    {email}
                </div>
                <div className="readiness">
                    Status: {completed ? 'completed' : 'not completed' }
                </div>

                {   isAdmin &&
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <EditTodoButton
                            id={id}
                            text={text}
                            status={status}
                        />
                    </Col>
                }
            </span>

            <Col
                className="text"
                lg={8} md={7} sm={6} xs={12}
            >
                {text}
            </Col>
        </Grid>
    );
};

Todo.propTypes = {
    todos: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        text: PropTypes.string,
        status: PropTypes.number,
        image_path: PropTypes.string
    }),
    isAdmin: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        isAdmin: state.signIn.isAdmin
    };
};

Todo = connect(
    mapStateToProps
)(Todo);

export default Todo;
