import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

import FormInput from '../FormInput/FormInput.component';
import { signUpStart } from '../../redux/user/user.actions';

import './sign-up.styles.scss';


const SignUp= ({ signUpStart }) => {

    const [ userCredentials, setUserCredentials ] = useState({
        displayName : '',
        age : '',
        gender : '',
        sunSign : '',
        dob : ''
    });

    const genders = [
        { value:"male", label:"Male", name:"gender"},
        { value:"female", label:"Female", name:"gender"},
        { value:"other", label:"Others", name:"gender"}
    ]

    const signs =[
        {value:"Aries", label:"Aries", name:"sunSign"},
        {value:"Taurus", label:"Taurus",name:"sunSign"},
        {value:"Gemini", label:"Gemini",name:"sunSign"},
        {value:"Cancer", label:"Cancer",name:"sunSign"},
        {value:"Leo", label:"Leo",name:"sunSign"},
        {value:"Virgo", label:"Virgo",name:"sunSign"},
        {value:"Libra", label:'Libra',name:"sunSign"},
        {value:"Scorpio", label:'Scorpio',name:"sunSign"},
        {value:"Sagittarius", label:'Sagittarius',name:"sunSign"},
        {value:"Capricon", label:'Capricon',name:"sunSign"},
        {value:"Aquarius", label:'Aquarius',name:"sunSign"},
        {value:"Pisces", label:'Pisces',name:"sunSign"},                                    
    ]

    const selectStyles={
        margin: "3% auto",
        width: "60vw"
    }

    const {displayName, age, dob} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        signUpStart(userCredentials);
    }

    const handleSelect = event => {
        // event.preventDefault();
        // console.log("select target", event);
        setUserCredentials({
            ...userCredentials,
            [event.name] : event.value
        })
    }

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({
            ...userCredentials,
            [name] : value
        })
    }
        return(
            <div className='sign-up'>
                <h2 className="title">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        label='Name'
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type='number'
                        name='age'
                        value={age}
                        label='Age'
                        onChange={handleChange}
                        required
                    />
                    <FormInput
                        type='date'
                        name='dob'
                        value={dob}
                        onChange={handleChange}
                        required
                    />
                    <Select placeholder="Gender" styles={selectStyles} onChange={handleSelect} options={genders} required/>
                    <Select placeholder="Sun sign" styles={selectStyles} onChange={handleSelect} options={signs} required/>
                    <Button as="input" variant="outline-info" type='submit' value="SUBMIT"/>
                    <div>
                        <span>Already Submitted? Go to Gallery</span>
                        <Button href="/gallery">Gallery</Button>
                    </div>
                </form>
            </div>
        )
    }

const mapDispatchToProps = dispatch => ({
    signUpStart : userCredentials => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);