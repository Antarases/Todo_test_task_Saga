import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import createSagaMiddleware from 'redux-saga';
import TodoApp from '../todo-app/todo-app.component';
import rootSaga from '../../sagas';

export const sagaMiddleware = createSagaMiddleware();

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

sagaMiddleware.run(
    rootSaga
);

export default Root;
