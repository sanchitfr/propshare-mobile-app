import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import FormInput from '../FormInput/FormInput.component';

import { emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss';


const SignIn = ({emailSignInStart}) => {
    const [ userCredentials, setUserCredentials ] = useState({ email : '', password : ''});

    const { email, password } = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();        
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;
        setUserCredentials({...userCredentials, [name] : value})
    }

        return(
            <div className='sign-in'>
                <h2 className='title'>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput 
                    type="email" 
                    name='email'
                    label="Email"
                    handleChange = {handleChange}
                    value={email}
                    required/>

                    <FormInput 
                    type="password" 
                    name='password' 
                    label='Password'
                    handleChange = {handleChange}
                    value={password}
                    required/>
                    <Button className="sign-in-button" variant="outline-secondary" type='submit' >Sign In</Button>
                </form>
            </div> 
        );
    }   

const mapDispatchToProps = dispatch => ({
    emailSignInStart : (email, password) => dispatch(emailSignInStart({email, password})) 
})

export default connect(null,mapDispatchToProps)(SignIn);