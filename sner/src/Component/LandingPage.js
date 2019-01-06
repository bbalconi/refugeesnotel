import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
const axios = require('axios');

class LandingPage extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <LandingDiv>
                <TextWrap>
                    <Text>sign in:</Text>
                </TextWrap>
                <InputWrapper>
                    <Input placeholder='username' />
                </InputWrapper>
                <InputWrapper bottom>
                    <Input type='password' placeholder='password' />
                </InputWrapper>
                <ButtonWrap>
                        <Button>//</Button>
                    </ButtonWrap>
                <TextWrap bottom>
                    <Text bottom><Link to='signup' style={{color:'black'}}>sign up</Link></Text>
                </TextWrap>
            </LandingDiv>
        );
    }
}

const LandingDiv = styled.div`
    align-content: center;
    margin-top: 30vh;
    height: 40vh;
`

const ButtonWrap = styled.div`
    margin-top: 1.5vh;
    height: 2vh;
    position: relative;
    width: 10.2%;
    margin-left: auto;
    margin-right: auto;
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

const TextWrap = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    padding-top: 8vh;
    margin-top: 3vh;
    width: 10vw;

    ${props => props.bottom && css`
        padding-top: 0;
  `}
`

const Text = styled.p`
    text-align: left;
    
    ${props => props.bottom && css`
        font-size: .75em;
        text-align: right;
  `}
`

const InputWrapper = styled.div`
    position: relative;

    ${props => props.bottom && css`
        top: 1vh;
  `}
`

const Input = styled.input`
    width: 10%;
    height: 14%;
    display: block;
    margin-left: auto;
    margin-right: auto;
`

export default LandingPage;