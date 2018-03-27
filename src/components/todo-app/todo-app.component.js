import React from 'react';
import './todo-app.component.css';
import { connect } from 'react-redux';

import LoginForm from '../login-form/login-form.component';
import AddTodo from '../add-todo/add-todo.component';
import SortingBar from '../sorting-bar/sorting-bar.component';
import TodoList from '../todo-list/todo-list.component';
import Pagination from '../pagination/pagination.component';
import EditTodoInputs from '../edit-todo-inputs/edit-todo-inputs.component';


const TodoApp = ({
    isAdmin,
    isEditing
}) => (
    <div id="todo-app">
        <LoginForm />

        {
            isAdmin && isEditing &&
               <EditTodoInputs />
        }


        <AddTodo />

        <SortingBar />

        <TodoList />

        <Pagination />
    </div>
);

const mapStateToProps = (state) => {
    return {
        isAdmin: state.signIn.isAdmin,
        isEditing: state.editTodoInfo.isEditing
    }
};

export default connect(
    mapStateToProps,
    null
)(TodoApp);
