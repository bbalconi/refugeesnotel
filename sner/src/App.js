import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { Provider } from "mobx-react"
import Home from './Home/Home'
import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import SnowStore from './Stores/SnowStore';
import primary from 'material-ui/colors/teal';
import secondary from 'material-ui/colors/blueGrey';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: secondary,
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {
  render() {
    return (
      <Provider snowStore={new SnowStore()}>
        <Router>
          <div>
            <MuiThemeProvider theme={theme}>
              <div stlye={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
                <Navbar />
                <div style={{maxWidth:'1100px', margin: '0 auto', padding: '0 1em', flex: 1}}>
                <Route exact path='/' render={() => <Home />} />
                
                </div>
                <Footer />
              </div>
            </MuiThemeProvider>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
