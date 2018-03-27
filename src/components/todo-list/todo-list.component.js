import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchPosts
} from '../../actions';
import Todo from '../todo/todo.component';


class TodoList extends React.Component{

    componentDidMount(){
        const {dispatch} = this.props;

        dispatch(fetchPosts());
    }

    render(){
        const {todos, isAdmin} = this.props;

        return <section id="todo-list">
            {
                todos.map(todo =>
                    <Todo
                        key={todo.id}
                        isAdmin={isAdmin}
                        {...todo}
                    />
                )
            }
        </section>
    }
}

TodoList.propTypes = {
    todos: PropTypes.array
};


const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

TodoList = connect(
    mapStateToProps
)(TodoList);

export default TodoList;
