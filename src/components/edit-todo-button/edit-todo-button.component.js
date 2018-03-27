import React from 'react';
import { Button } from 'react-bootstrap';

import {connect} from 'react-redux';
import {
    editTodoInfo
} from '../../actions';

import './edit-todo-button.component.css'


let EditTodoButton = ({
    onClick
}) => (
    <Button
        onClick={() => {
            onClick();
            smoothScrollUp();
        }}
        className="glyphicon glyphicon-edit"
        id="edit-todo-button"
    >
        <span className="text">
            Edit
        </span>
    </Button>
);


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () =>
            dispatch(editTodoInfo(
                true,
                ownProps.id,
                ownProps.text,
                ownProps.status
            ))
    }
};

EditTodoButton = connect(
    null,
    mapDispatchToProps
)(EditTodoButton);


let smoothScrollUp = () => {
    if (document.body.scrollTop>0 || document.documentElement.scrollTop>0) {
        window.scrollBy(0,-50);
        setTimeout(smoothScrollUp, 10);
    }
};

export default EditTodoButton;
