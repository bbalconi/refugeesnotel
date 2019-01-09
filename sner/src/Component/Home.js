import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, withRouter } from 'react-router-dom';
import Main from '../Component/Main';
import styled, { css } from 'styled-components';
var axios = require('axios')

var Home = observer(class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true
    }
  }
  

  componentDidMount() {
    let loggedUser = this.props.snowStore.user
    if (loggedUser){
    return new Promise((resolve, reject) => {
      axios.post('/retrieveSavedLocations', {
        id: this.props.snowStore._id
      }).then((res) => {
        if (res.data.length) {
        let grabNew = res.data;
        grabNew.forEach(element => {
          let grabNewCoords = {
            lat: element.locationObject.latitude,
            lng: element.locationObject.longitude,
            id: element._id
          };
          axios.post('/darthVader', {
            lat: grabNewCoords.lat,
            lng: grabNewCoords.lng
          }).then((res)=>{
            axios.put('/updateCard', {
              user_id: this.props.snowStore._id,
              _id: grabNewCoords.id,
              newData: res.data
            }).then((res) => {
              if (res.data === "Success") {
                axios.post('/retrieveSavedLocations', {
                  id: this.props.snowStore._id
                }).then((res) => {
                  this.props.snowStore.weather = res.data;
                  this.props.snowStore.loaded = true;
                })}})})});
      } else {
        this.props.snowStore.loaded = true;
      }
      });
    })
  } else {
    this.setState({loggedIn:false});
  }
  } 
  
  render() {
    const loggedIn = this.state.loggedIn
    if (this.props.snowStore.loaded === true) {
    return (
      <Parent>
        <Main />
      </Parent>
    )} else {
      return(<Parent primary>
        <Loading src='./Spinner-4.3s-171px.gif'/>
        {loggedIn ? <div></div> : <Redirect to='/'/>}
        </Parent>)
    };
  };
});

const Parent = styled.div`
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
${props => props.primary && css`
  height: 100vh;
`}`

const Loading = styled.img`
display: block;
margin-left: auto;
margin-right: auto;
margin-top: 15%;
width: 7.5%;`


export default withRouter(inject('snowStore')(Home));

