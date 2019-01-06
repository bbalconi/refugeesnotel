import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
const axios = require('axios');

class LandingPage extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <InputWrapper>
                <Input/>
                
            </InputWrapper>
        );
    }
}

const InputWrapper = styled.div`
    height: 100vh
`

const Input = styled.input`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30vh;
`

export default LandingPage;