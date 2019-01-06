import React, { Component } from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
const axios = require('axios');

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            error: false,
            form: false,
            duplicate: false,
            redirect: false
        }
    }

    username(e){this.setState({username: e.target.value})}
    password(e){this.setState({password: e.target.value})}
    confirm(e){this.setState({confirm: e.target.value})}

    signUp(){
        this.state.username && this.state.password && this.state.confirm ?
        this.state.confirm == this.state.password ?
            new Promise((res, rej) => {
            axios.post('/saveUser', {
                username: this.state.username,
                password: this.state.password
            }).then((res) => {
                res.data.duplicate ? this.setState({duplicate:true}) : this.setState({redirect:true});
        })
    })
            : this.setState({error:true})
        : this.setState({form:true})
    }

    render() {
        const [error, form, duplicate, redirect] = [this.state.error, this.state.form, this.state.duplicate, this.state.redirect]
        return (
            <LandingDiv>
                <TextWrap>
                    <Text>sign up:</Text>
                </TextWrap>
                <InputWrapper>
                    <Input type='text' placeholder='username' onChange={(e) => this.username(e)} value={this.state.username}/>
                </InputWrapper>
                <InputWrapper middle>
                    <Input type='password' placeholder='password' onChange={(e) => this.password(e)} value={this.state.password}/>
                </InputWrapper>
                <InputWrapper bottom>
                    <Input type='password' placeholder='confirm password' onChange={(e) => this.confirm(e)} value={this.state.confirm}/>
                </InputWrapper>
                <ButtonWrap bottom>
                    <Button onClick={this.signUp}>//</Button>
                </ButtonWrap>
                <Error>
                    {error ? (<Text error>username taken and/or passwords don't match</Text>) : form ? (<Text error>form incomplete</Text>) : 
                    duplicate ? (<Text error>user already exists</Text>) : (<div></div>)}
                </Error>
        {redirect ? (<Redirect to="/"/>) : <div></div>}
            </LandingDiv>
        );
    }
}

const LandingDiv = styled.div`
    align-content: center;
    margin-top: 30vh;
    height: 40vh;
`

const TextWrap = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8vh;
    width: 10vw;
`

const ButtonWrap = styled.div`
    position: relative;
    top: 3vh;
    width: 10%;
    margin-left: auto;
    margin-right: auto;
`

const Text = styled.p`
    text-align: left;
    
    ${props => props.error && css`
        color: red;
        font-size: .5em;
        text-align: right;
  `}
`

const InputWrapper = styled.div`
    position: relative;

    ${props => props.bottom && css`
        top: 2vh;
  `}
  ${props => props.middle && css`
        top: 1vh;
        bottom: 1vh;
  `}
`

const Button = styled.button`
    float: right;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: bold;
    border-radius: 3px;
    color: white;
    width: 32px;
    height: 30px;
    background: #ba7284;
    font-size: 1.25em;
    border: 2px solid #ba7284;
`

const Input = styled.input`
    width: 10%;
    height: 14%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`

const Error = styled.div`
    height: 10.3%;
    width: 10%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8vh;
`

export default SignUp;