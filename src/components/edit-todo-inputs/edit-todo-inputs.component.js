import React from 'react';
import {connect} from 'react-redux';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';

import {
    editTodo
} from '../../actions';

import './edit-todo-inputs.component.css';

class EditTodoInputs extends React.Component{
    constructor(props){
        super(props);

        let {id, text, status} = this.props;
        let checked = false;
        if(status === 10){
            checked = true;
        } else if(status === 0){
            checked = false;
        }

        this.state={
            id,
            text,
            status,
            checked
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.id !== this.state.id){
            this.setState({id: nextProps.id})
        }

        if(nextProps.text !== this.state.text){
            this.setState({text: nextProps.text})
        }

        let checked;
        if(nextProps.status === 10){
            checked = true;
        } else if(nextProps.status === 0){
            checked = false;
        }

        if(checked !== this.state.checked){
            this.setState({checked: checked})
        }
    }


    render(){
        let {onClick} = this.props;

        return (
            <Grid
                componentClass="section"
                id="edit-todo-inputs"
            >
                <Row>
                    <Col
                        className="title"
                        lg={4} md={6} sm={6} xs={12}
                        lgOffset={4} mdOffset={3} smOffset={3}
                    >
                        Edit Todo
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="text"
                        componentClass="label"
                        lg={4} md={6} sm={6} xs={12}
                        lgOffset={4} mdOffset={3} smOffset={3}
                    >
                        <span>Text:</span>
                        <FormControl
                            type="text"
                            bsSize="small"
                            value={this.state.text}
                            onChange={(e) => this.setState({text: e.target.value})}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col
                        className="completed"
                        componentClass="label"
                        lg={4} md={6} sm={6} xs={12}
                        lgOffset={4} mdOffset={3} smOffset={3}
                    >
                        <span>Completed: </span>
                        <FormControl
                            type="checkbox"
                            bsSize="small"
                            checked={this.state.checked}
                            onChange={(e) => this.setState({checked: e.target.checked})}
                        />
                    </Col>
                </Row>


                <Col
                    className="submitButtonContainer"
                    lg={4} md={6} sm={6} xs={12}
                    lgOffset={4} mdOffset={3} smOffset={3}
                >
                    <Button
                        onClick={() => {
                            let status;
                            if(this.state.checked === true){
                                status = 10;
                            } else if(this.state.checked === false){
                                status = 0;
                            }

                            onClick(
                                this.state.id,
                                this.state.text,
                                status
                            )
                        }}
                        bsStyle="primary"
                    >
                        Apply
                    </Button>
                </Col>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.editTodoInfo.id,
        text: state.editTodoInfo.text,
        status: state.editTodoInfo.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (id, text, status) => {
            dispatch(editTodo(
                id,
                text,
                status
            ));
        }
    };
};

EditTodoInputs = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditTodoInputs);

export default EditTodoInputs;
