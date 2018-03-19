import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from '../../actions';
import { connect } from 'react-redux';

import { Grid, Col, FormControl, Button } from 'react-bootstrap';

import './login-form.component.css';


class LoginForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {isAdmin, signInAttempt, dispatch} = this.props;

        return (
            <Grid  componentClass="section" id="login-form">
                <Col
                    className="login"
                    componentClass="label"
                    lg={2} md={2} sm={3} xs={12}
                >
                    <span>Login:</span>

                    <FormControl
                        type="text"
                        className="login"
                        bsSize="small"
                        inputRef={node => this.login = node}
                    />
                </Col>

                <Col
                    className="password"
                    componentClass="label"
                    lg={2} md={2} sm={3} xs={12}
                >
                    <span>Password:</span>

                    <FormControl
                        type="text"
                        className="password"
                        bsSize="small"
                        inputRef={node => this.password = node}
                    />
                </Col>

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => {
                        dispatch(signIn(
                            this.login.value,
                            this.password.value
                        ));

                        this.login.value = '';
                        this.password.value = '';
                    }}
                >
                    Sign in
                </Button>

                {(isAdmin === false && signInAttempt === true) &&
                    <div className="failedAdmSignIn">
                        {`Signing in as Admin failed.
                        Wrong login or password.`}
                     </div>

                }
            </Grid>
        );
    }
}

LoginForm.propTypes = {
    isAdmin: PropTypes.bool,
    signInAttempt: PropTypes.bool
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.signIn.isAdmin,
        signInAttempt: state.signIn.signInAttempt
    }
};

export default connect(
    mapStateToProps,
    null
)(LoginForm);
