import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';
import {
    addTodo
} from '../../actions';
import imageValidation from '../../imageValidation';

import './add-todo.component.css';


class AddTodo extends React.Component {
    constructor(props){
        super (props);
    }

    render(){
        const {dispatch} = this.props;

        return (
            <Grid componentClass="section" id="add-todo">
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(addTodo(
                            this.username.value,
                            this.email.value,
                            this.text.value,
                            this.image.files[0]
                        ));

                        this.username.value='';
                        this.email.value='';
                        this.text.value='';
                        this.image.value=null;
                    }}
                >
                    <Row>
                        <Col
                            className="title"
                            lg={4} md={6} sm={6} xs={12}
                            lgOffset={4} mdOffset={3} smOffset={3}
                        >
                            Add Todo
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            className="username"
                            componentClass="label"
                            lg={4} md={6} sm={6} xs={12}
                            lgOffset={4} mdOffset={3} smOffset={3}
                        >
                            <span>User Name:</span>
                            <FormControl
                                type="text"
                                required="required"
                                placeholder="John Becker"
                                bsSize="small"
                                inputRef={node => this.username = node}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            className="email"
                            componentClass="label"
                            lg={4} md={6} sm={6} xs={12}
                            lgOffset={4} mdOffset={3} smOffset={3}
                        >
                            <span>Email:</span>
                            <FormControl
                                type="email"
                                required="required"
                                placeholder="johnbecker@gmail.com"
                                bsSize="small"
                                inputRef={node => this.email = node}
                            />
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
                                required="required"
                                placeholder="Enter text"
                                bsSize="small"
                                inputRef={node => this.text = node}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col
                            className="image"
                            componentClass="label"
                            lg={4} md={6} sm={6} xs={12}
                            lgOffset={4} mdOffset={3} smOffset={3}
                        >
                            <span>Image:</span>
                            <FormControl
                                type="file"
                                accept="image/*"
                                required="required"
                                inputRef={node => this.image = node}
                                onChange={() => imageValidation(this.image, this.imageValidationNode)}
                            />
                            <span
                                className="image-validation-text"
                                ref={node => this.imageValidationNode = node}
                            >
                            </span>
                        </Col>
                    </Row>

                    <Col
                        className="submitButtonContainer"
                        lg={4} md={6} sm={6} xs={12}
                        lgOffset={4} mdOffset={3} smOffset={3}
                    >
                        <Button
                            type="submit"
                            bsStyle="primary"
                        >
                            Submit
                        </Button>
                    </Col>
                </form>
            </Grid>
        )
    }
};

export default connect()(AddTodo);
