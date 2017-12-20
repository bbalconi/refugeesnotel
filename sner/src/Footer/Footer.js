import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
var axios = require('axios')

var Footer = observer(class Footer extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="footer" style={{ justifyContent: 'space-between', backgroundColor: '#333', paddingTop: 30, paddingBottom: 30, paddingLeft: '1.5em', paddingRight: '1.5em', color: '#fff' }}>
        <div className="footer-container container" style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <ul>
              <li><Link style={{ color: '#ccc' }} to="/about">About</Link></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
})

export default withRouter(inject('snowStore')(Footer));

