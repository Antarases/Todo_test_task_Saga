import React from 'react';
import { connect } from 'react-redux';
import { fetchSortedPosts } from '../../actions';

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
        onClick: () => dispatch(
            fetchSortedPosts(ownProps.sortField)
        )
    };
};

SortingCase = connect(
    null,
    mapDispatchToProps
)(SortingCase);


export default SortingCase;
