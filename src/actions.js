import url from './server_url';

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

/*--------------------------------------------------------------------------------------------------------------------*/

export function fetchPosts(){
    return (dispatch, getState) => {

        let { sortField, sortDirection } = getState().sortingInfo;
        const { currentPage } = getState().pagination;

        const fecthUrl = url.fetch_todos+`&sort_field=${sortField}&sort_direction=${sortDirection}`;

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


export function fetchSortedPosts(sortField) {
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

export function addTodoThunk(
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
            .then(json => {
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

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    }
    else {
        console.log('An error occurred.', response);
    }
};

// export function editTodo(
//     text,
//     status
// ){
//     return (dispatch) => {
//         var form = new FormData();
//         if(typeof(status) !== 'undefined'){
//             form.append('status', status);
//         }
//         if(typeof(text) !== 'undefined'){
//             form.append('text', text);
//         }
//         form.append('token', 'beejee');
//
//         const options = {
//             method: 'POST',
//             mode: 'cors',
//             body: form,
//             headers: {
//                 'Authorization': 'beejee'
//             }
//         };
//
//         return fetch(url, options)
//             .then(checkStatus)
//             .then(json => {
//                 console.log(json);
//             })
//     }
// }
//
// function fixedEncodeURIComponent(str) {
//     return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
//         return '%' + c.charCodeAt(0).toString(16);
//     });
// }
