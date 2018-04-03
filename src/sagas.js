import {all, takeEvery, takeLatest, select, put, call} from 'redux-saga/effects';

import url from './server_url';
import md5 from 'md5';

/*-------- Action Creators ----------------------------------------------------------*/

export const FETCH_POSTS = 'FETCH_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_TODO = 'ADD_TODO';
export const CHANGE_PAGE_SAGA = 'CHANGE_PAGE_SAGA';
export const EDIT_TODO_SAGA = 'EDIT_TODO_SAGA';

export const SET_TODOS = 'SET_TODOS';
export const CHANGE_SORT_INFO = 'CHANGE_SORT_INFO';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SIGN_IN = 'SIGN_IN';
export const EDIT_TODO_INFO = 'EDIT_TODO_INFO';
export const EDIT_TODO = 'EDIT_TODO';

const setTodos = (todos) => {
    return {
        type: SET_TODOS,
        todos
    }
};

const changeSortInfo = (
    sortField,
    sortDirection
) => {
    return {
        type: CHANGE_SORT_INFO,
        sortField,
        sortDirection
    }
};

const changePageAC = (
    currentPage,
    totalPages
) => {
    return {
        type: CHANGE_PAGE,
        currentPage,
        totalPages
    };
};

export const signIn = (
    login,
    password
) => {
    return {
        type: SIGN_IN,
        login,
        password
    };
};

export const editTodoInfo = (
    isEditing,
    id,
    text,
    status
) => {
    return {
        type: EDIT_TODO_INFO,
        isEditing,
        id,
        text,
        status
    };
};

const editTodoAC = (
    id,
    text,
    status
) => {
    return {
        type: EDIT_TODO,
        id,
        text,
        status
    };
};

/*--------------------------------------------------------------------------------------------------------------------*/

function* fetchPosts(){
    try{
        const { sortField, sortDirection } = yield select(state => state.sortingInfo);
        const { currentPage } = yield select(state => state.pagination);

        const fecthUrl = url.fetch_todos+`&sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}`;

        const response = yield call(fetchApi, fecthUrl);

        yield put(setTodos(response.message.tasks));

        if(response.message.total_task_count > 3)
        {
            yield put(changePageAC(
                currentPage,
                Math.ceil(response.message.total_task_count / 3)
            ));
        }
    } catch(err){
        console.log('An error occurred: ', err);
    }
}

function* watchFetchPosts(){
    yield takeLatest(FETCH_POSTS, fetchPosts)
}

/*--------------------------------------------------------------------------------------------------------------------*/

function* sortPosts({
    sortField
}){
    try{
        console.log('sortField: ', sortField);
        let { sortField:currentSortField, sortDirection } = yield select(state => state.sortingInfo);
        if(sortField === currentSortField){
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';    //reversing sorting direction
        }
        else {
            sortDirection = 'asc';
        }

        const sortUrl = url.fetch_todos+`&sort_field=${sortField}&sort_direction=${sortDirection}`;

        const response = yield call(fetchApi, sortUrl);
        yield put(changeSortInfo(sortField, sortDirection));
        yield put(setTodos(response.message.tasks));
    } catch(err){
        console.log('An error occurred: ', err);
    }
}

function* watchSortPosts(){
    yield takeLatest(SORT_POSTS, sortPosts);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function* addTodo({
    username,
    email,
    text,
    image
}){
    console.log(username,email,text,image);
    try{
        var form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('text', text);
        form.append('image', image);

        const options = {
            method: 'POST',
            mode: 'cors',
            body: form
        };

        yield call(fetchApi, url.create_todo, options);
        yield call(fetchPosts);
    } catch(err){
        console.log('An error occurred: ', err);
    }
}

function* watchAddTodo(){
    yield takeLatest(ADD_TODO, addTodo)
}

/*--------------------------------------------------------------------------------------------------------------------*/

function* changePage({
    direction
}){
    try{
        let {currentPage} = yield select(state => state.pagination);
        direction === 'next' ?
            currentPage++ :
            currentPage--;

        const fecthUrl = url.fetch_todos+'&page='+currentPage;
        const response = yield call(fetchApi, fecthUrl);

        yield put(setTodos(response.message.tasks));
        yield put(changePageAC(
            currentPage,
            Math.ceil(response.message.total_task_count / 3)
        ));
    } catch(err){
        console.log('An error occurred: ', err);
    }
}

function* watchChangePage(){
    yield takeEvery(CHANGE_PAGE_SAGA, changePage);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function* editTodo({
    id,
    text,
    status
}){
    try{
        if(typeof(status) !== 'undefined' || typeof(text) !== 'undefined'){
            const form = createBodyForEditingTodoRequest(status, text);

            const options = {
                method: 'POST',
                mode: 'cors',
                body: form,
            };

            const url_edit = url.edit_todo + `/${id}?developer=ReduxSaga`;

            yield call(fetchApi, url_edit, options);

            yield put(editTodoInfo(false));
            yield put(editTodoAC(id, text, status));
        }
    } catch(err){
        console.log('An error occurred: ', err);
    }
}

function* watchEditTodo(){
    yield takeEvery(EDIT_TODO_SAGA, editTodo);
}

/*--------------------------------------------------------------------------------------------------------------------*/

export default function* rootSaga(){
    yield all([
        watchFetchPosts(),
        watchSortPosts(),
        watchAddTodo(),
        watchChangePage(),
        watchEditTodo()
    ]);
}

const fetchApi = (url, options) => fetch(url, options).then(response => response.json());

const createBodyForEditingTodoRequest = (
    status,
    text
) => {
    let params_string = [];

    let form = new FormData();

    let token = 'beejee';
    let encodedToken = fixedEncodeURIComponent('token') +
        '=' +
        fixedEncodeURIComponent(token);

    if(typeof(status) !== 'undefined'){
        form.append('status', status);

        let encodedStatus = fixedEncodeURIComponent('status') +
            '=' +
            fixedEncodeURIComponent(status);

        params_string.push(encodedStatus);
    }
    if(typeof(text) !== 'undefined'){
        form.append('text', text);

        let encodedText = fixedEncodeURIComponent('text') +
            '=' +
            fixedEncodeURIComponent(text);

        params_string.push(encodedText);
    }

    params_string.push(encodedToken);

    params_string = params_string.join('&');

    const signature = md5(params_string);

    form.append('token', 'beejee');
    form.append('signature', signature);

    return form;
};

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}
