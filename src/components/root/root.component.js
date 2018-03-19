import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import TodoApp from '../todo-app/todo-app.component';

const store = configureStore();

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <TodoApp />
            </Provider>
        )
    }
}

export default Root;
