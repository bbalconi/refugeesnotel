import React, { Component } from 'react';

var axios = require('axios')

export default class Home extends Component {

  componentDidMount(){
    axios.get('/skyWalker').then((res) => {
      console.log('lasjdflkasjdflkj')
      console.log(res);
    })
  }

  render() {
    return (
      <div>
        fuck
      </div>
    );
  }
}
