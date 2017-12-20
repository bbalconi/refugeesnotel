import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Icon from 'material-ui/Icon';
import Avatar from 'material-ui/Avatar';
import { inject, observer } from 'mobx-react';

// function Navbar(props) {
// var Navbar = observer(class Navbar extends Component {
const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
});


var Navbar = observer(class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} style={{ marginTop: '0' }}>
        <AppBar position="static">
          <Toolbar > 
            <Typography type="title" className={classes.flex}>
              <Link style={{ color: '#fff' }} color="contrast" to="/">Refugee Snotel</Link>
            </Typography>
          </Toolbar>
        </AppBar>
          </div>
    );
  }
});

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default inject('snowStore')(withStyles(styles)(Navbar));
// https://material-ui-next.com/demos/app-bar/