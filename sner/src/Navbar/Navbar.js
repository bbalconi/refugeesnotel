import React, { Component } from 'react';
import styled, { css } from 'styled-components';



export default class Navbar extends Component {
  render() {
    return (
      <Navvy>
        <ListItem left><i className="material-icons">drag_handle</i></ListItem>
        <ListItem center><i className="material-icons">sentiment_very_satisfied</i></ListItem>
        <ListItem right><i className="material-icons">search</i></ListItem>
      </Navvy>
    );
  }
}

const Navvy = styled.ul`    
  list-style-type: none;
  z-index:1;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
`;

const ListItem = styled.li`
  font-size: 36px;

  ${props => props.left && css`
  float: left;
  cursor: default;
  `}

  ${props => props.right && css`
  float: right;
  display: inline;
  margin-right: 30px;
  cursor: default;
  `}

  ${props => props.center && css`
  text-align: center;
  color: red;
  display: inline;
  cursor: default;
`}`;