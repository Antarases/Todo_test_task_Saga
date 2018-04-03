import { combineReducers } from 'redux';

import {
    SET_TODOS,
    CHANGE_SORT_INFO,
    CHANGE_PAGE,
    SIGN_IN,
    EDIT_TODO_INFO,
    EDIT_TODO
} from './sagas';


const todo = (state, action) => {
    switch(action.type){
        case EDIT_TODO:
            if(state.id !== action.id){
                return state;
            }

            return {
                ...state,
                text: action.text,
                status: action.status
            };
        default:
            return;
    }
};

const todos = (state=[], action) => {
    switch(action.type){
        case SET_TODOS:
            return [
                ...action.todos
            ];
        case EDIT_TODO:
            return state.map(t =>
                todo(t, action)
            );
        default:
            return state;

    }
};

const sortingInfo = (
    state={
        sortField: 'id',
        sortDirection: 'asc'
    },
    action
) => {
    switch(action.type){
        case CHANGE_SORT_INFO:
            return {
                sortField: action.sortField,
                sortDirection: action.sortDirection
            };
        default:
            return state;
    }
};

const pagination = (
    state={
        currentPage: 1,
        totalPages: 1
    },
    action
) => {
    switch(action.type){
        case CHANGE_PAGE:
            return {
                currentPage: action.currentPage,
                totalPages: action.totalPages
            };
        default:
            return state;
    }
};

const signIn = (
    state={
        isAdmin: false,
        signInAttempt: false
    },
    action
) => {
    switch(action.type){
        case SIGN_IN:
            if(action.login === 'admin' && action.password === '123'){
                return {
                    isAdmin: true,
                    signInAttempt: true
                };
            }

            return {
                isAdmin: false,
                signInAttempt: true
            };
        default:
            return state;
    }
};

const editTodoInfo = (
    state={isEditing: false},
    action
) => {
    switch(action.type){
        case EDIT_TODO_INFO:
            return {
                isEditing: action.isEditing,
                id: action.id,
                text: action.text,
                status: action.status
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    todos,
    sortingInfo,
    pagination,
    signIn,
    editTodoInfo
});

export default rootReducer;
