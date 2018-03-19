import { combineReducers } from 'redux';

import {
    SET_TODOS,
    CHANGE_SORT_INFO,
    ADD_TODO,
    CHANGE_PAGE,
    SIGN_IN
} from './actions';


const todo = (state, action) => {
    switch(action.type){
        case ADD_TODO:
            return {
                id: action.id,
                username: action.username,
                email: action.email,
                text: action.text,
                status: action.status,
                image_path: action.image_path
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
        case ADD_TODO:
            return [
                ...state,
                todo(null, action)
            ];
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

const rootReducer = combineReducers({
    todos,
    sortingInfo,
    pagination,
    signIn
});

export default rootReducer;
