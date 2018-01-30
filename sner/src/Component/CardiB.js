import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

var CardiB = observer(class CardiB extends Component {
  render() {
    console.log(this.props.snowStore.weather);
    return (
      <div></div>
    );
  }
})

const DailyCard = styled.div`
  padding-top: 30px;
  margin-left: 30px;
  font-weight: bold;
  color: black;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;

  ${props => props.insta && css`
    font-size: 2.5em;
  `}`

export default withRouter(inject('snowStore')(CardiB));
