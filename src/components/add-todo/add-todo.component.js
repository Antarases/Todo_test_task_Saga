import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';
import {
    addTodo
} from '../../actions';
import imageValidation from '../../imageValidation';
import TodoPreview from '../todo-preview/todo-preview.component';

import './add-todo.component.css';


class AddTodo extends React.Component {
    constructor(props){
        super (props);

        this.state={
            username: '',
            email: '',
            text: '',
            isPreview: false
        }
    }

    render(){
        const {dispatch} = this.props;

        return (
            <React.Fragment>
                <Grid componentClass="section" id="add-todo">
                    <form action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            dispatch(addTodo(
                                this.state.username,
                                this.state.email,
                                this.state.text,
                                this.image.files[0]
                            ));

                            this.image.value=null;

                            this.setState({
                                isPreview: false,
                                previewImgSrc: null,
                                username: '',
                                email: '',
                                text: ''

                            });
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
                                    value={this.state.username}
                                    onChange={(e) => this.setState({username: e.target.value})}
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
                                    value={this.state.email}
                                    onChange={(e) => this.setState({email: e.target.value})}
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
                                    value={this.state.text}
                                    onChange={(e) => this.setState({text: e.target.value})}
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
                                    onChange={(e) => {
                                        imageValidation(this.image, this.imageValidationNode);
                                        this.setState({image: e.target.value});
                                    }}
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
                                bsStyle="primary"
                                className="previewButton"
                                disabled={!(this.state.image && this.state.username && this.state.email && this.state.text)}
                                onClick={() => {
                                    if(this.image.files[0]){
                                        this.setState({isPreview: true});
                                        this.reader  = new FileReader();
                                        this.reader.readAsDataURL(this.image.files[0]);

                                        this.reader.onload = () => {
                                            this.setState({previewImgSrc: this.reader.result})
                                        };
                                    }
                                }}
                            >
                                Preview
                            </Button>

                            <Button
                                type="submit"
                                bsStyle="primary"
                            >
                                Submit
                            </Button>
                        </Col>
                    </form>
                </Grid>


                {
                    this.state.isPreview && this.state.previewImgSrc &&
                    this.state.username && this.state.email && this.state.text && (
                        <TodoPreview
                            isPreview={this.state.isPreview}
                            previewImgSrc={this.state.previewImgSrc}
                            username={this.state.username}
                            email={this.state.email}
                            text={this.state.text}
                        />
                    )
                }
            </React.Fragment>
        )
    }
};

export default connect()(AddTodo);
