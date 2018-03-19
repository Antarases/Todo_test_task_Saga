import React from 'react';
import SortingCase from '../sorting-case/sorting-case.component';
import { Grid } from 'react-bootstrap';
import './sorting-bar.component.css';

const SortingBar = () => (
    <Grid
        id="sorting-bar"
        componentClass="section"
    >
        Sort by:
        {' '}
        <SortingCase sortField="username">
            User Name
        </SortingCase>
        {' '}
        <SortingCase sortField="email">
            Email
        </SortingCase>
        {' '}
        <SortingCase sortField="status">
            Status
        </SortingCase>
    </Grid>
);


export default SortingBar;
