import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { inject, observer } from 'mobx-react';
const axios = require('axios');

var LandingPage = observer(class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.success = this.success.bind(this);
        this.state = {
          username: '',
          password: '',
          error: false,
          redirect: false
        }
    }

    username(e){this.setState({username: e.target.value})}
    password(e){this.setState({password: e.target.value})}

    success(e){
        this.props.snowStore.user = e.username;
        this.props.snowStore._id = e._id
        this.setState({redirect:true});
    }   

    signIn(){
      new Promise((res, rej) => {
      axios.post('/login', {
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        res.data ? res.data === 'err' ? this.setState({error:true}) : this.success(res.data) : this.setState({error:true})
        })
      })
    }

    render() {
      const [error, redirect] = [this.state.error, this.state.redirect]
        return (
            <LandingDiv>
                <TextWrap>
                    <Text>sign in:</Text>
                </TextWrap>
                <InputWrapper>
                    <Input placeholder='username' onChange={(e) => this.username(e)} value={this.state.username}/>
                </InputWrapper>
                <InputWrapper bottom>
                    <Input type='password' placeholder='password' onChange={(e) => this.password(e)} value={this.state.password}/>
                </InputWrapper>
                <ButtonWrap>
                        <Button onClick={this.signIn}>//</Button>
                    </ButtonWrap>
                <TextWrap bottom>
                    <Text bottom><Link to='signup' style={{color:'black'}}>sign up</Link></Text>
                </TextWrap>
                <Error>
                    {error ? <Text error>auth failed</Text> : <div></div>}
                </Error>
                {redirect ? (<Redirect to="/Home"/>) : <div></div>}
            </LandingDiv>
        );
    }
})

export default withRouter(inject('snowStore')(LandingPage));

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

  ${props => props.error && css`
        color: red;
        font-size: .5em;
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

const Error = styled.div`
    height: 10.3%;
    width: 10%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1vh;
`