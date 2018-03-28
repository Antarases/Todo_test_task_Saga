import url from './server_url';
import md5 from 'md5';

/*---- Polyfills -------------------------------------------------------------------*/
import 'whatwg-fetch';
import 'promise-polyfill/src/polyfill';
import setAsap from 'setasap';
Promise._immediateFn = setAsap;
/*-----------------------------------------------------------------------------------*/

/*-------- Action Creators ----------------------------------------------------------*/

export const SET_TODOS = 'SET_TODOS';
export const CHANGE_SORT_INFO = 'CHANGE_SORT_INFO';
export const ADD_TODO = 'ADD_TODO';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const SIGN_IN = 'SIGN_IN';
export const EDIT_TODO_INFO = 'EDIT_TODO_INFO';

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

/*--------------------------------------------------------------------------------------------------------------------*/

export function fetchPosts(){
    return (dispatch, getState) => {

        let { sortField, sortDirection } = getState().sortingInfo;
        const { currentPage } = getState().pagination;

        const fecthUrl = url.fetch_todos+`&sort_field=${sortField}&sort_direction=${sortDirection}&page=${currentPage}`;

        return fetch(fecthUrl)
            .then(checkStatus)
            .then(json => {
                dispatch(changePageAC(
                    currentPage,
                    Math.ceil(json.message.total_task_count / 3)
                ));
                dispatch(setTodos(json.message.tasks))
            })
    };
};


export function sortPosts(sortField) {
    return (dispatch, getState) => {

        let { sortField:currentSortField, sortDirection } = getState().sortingInfo;
        if(sortField === currentSortField){
           sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';    //reversing sorting direction
        }
        else {
            sortDirection = 'asc';
        }

        const sortUrl = url.fetch_todos+`&sort_field=${sortField}&sort_direction=${sortDirection}`;

        return fetch(sortUrl)
            .then(checkStatus)
            .then(json => {
                dispatch(changeSortInfo(sortField, sortDirection));
                dispatch(setTodos(json.message.tasks))
            })
    };
}

export function addTodo(
    username,
    email,
    text,
    image
){
    return (dispatch) => {
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

        return fetch(url.create_todo, options)
            .then(checkStatus)
            .then(() => {
                dispatch(fetchPosts());
            })
    }
}

export function changePage(direction){
    return (dispatch, getState) => {
        let {currentPage} = getState().pagination;
        direction === 'next' ?
            currentPage++ :
            currentPage--;

        const fecthUrl = url.fetch_todos+'&page='+currentPage;
        return fetch(fecthUrl)
            .then(checkStatus)
            .then(json => {
                dispatch(setTodos(json.message.tasks));
                dispatch(changePageAC(
                    currentPage,
                    Math.ceil(json.message.total_task_count / 3)
                ));
            })
    };
};

export function editTodo(
    id,
    text,
    status
){
    return (dispatch) => {
        if(typeof(status) !== 'undefined' || typeof(text) !== 'undefined'){
            const form = createBodyForEditingTodoRequest(status, text);

            const options = {
                method: 'POST',
                mode: 'cors',
                body: form,
            };

            const url_edit = url.edit_todo + `/${id}?developer=Yaroslav_Grushchak`;


            return fetch(url_edit, options)
                .then(checkStatus)
                .then(json => {
                    dispatch(editTodoInfo(false));
                    dispatch(fetchPosts());
                });
        }
    }
}

const createBodyForEditingTodoRequest = (
    status,
    text
) => {
    let params_string = [];

    var form = new FormData();

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


function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    else {
        console.log('An error occurred.', response);
    }
};
