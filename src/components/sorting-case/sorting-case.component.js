import React from 'react';
import { connect } from 'react-redux';
import { SORT_POSTS } from '../../sagas';

let SortingCase = ({
    onClick,
    children
}) => (
    <a
        href=""
        onClick={(e) => {
            e.preventDefault();
            onClick();
        }}
    >
        {children}
    </a>
);


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => dispatch({
            type: SORT_POSTS,
            sortField: ownProps.sortField
        })
    };
};

SortingCase = connect(
    null,
    mapDispatchToProps
)(SortingCase);


export default SortingCase;
