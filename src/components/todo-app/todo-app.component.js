import React from 'react';
import './todo-app.component.css';
import { connect } from 'react-redux';

import LoginForm from '../login-form/login-form.component';
import AddTodo from '../add-todo/add-todo.component';
import SortingBar from '../sorting-bar/sorting-bar.component';
import TodoList from '../todo-list/todo-list.component';
import Pagination from '../pagination/pagination.component';


const TodoApp = ({
    isAdmin
}) => (
    <div id="todo-app">
        <LoginForm />

        {
            isAdmin &&
                <AddTodo />
        }

        <SortingBar />

        <TodoList />

        <Pagination />
    </div>
);

const mapStateToProps = (state) => {
    return {
        isAdmin: state.signIn.isAdmin
    }
};

export default connect(
    mapStateToProps,
    null
)(TodoApp);
