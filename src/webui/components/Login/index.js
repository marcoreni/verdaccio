import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

export default class LoginModal extends Component {
  static propTypes = {
    visibility: PropTypes.bool,
    error: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static defaultProps = {
    visibility: true,
    error: {},
    onCancel: () => { },
    onSubmit: () => { }
  }

  state = {
    username: '',
    password: ''
  }

  constructor(props) {
    super(props);
    this.submitCredentials = this.submitCredentials.bind(this);
    this.setCredentials = this.setCredentials.bind(this);
  }

  /**
   * set login modal's username and password to current state
   * Required by: <LoginModal />
   */
  setCredentials(name, e) {
    this.setState({
      [name]: e
    });
  }

  async submitCredentials(event) {
    // prevents default submit behaviour
    event.preventDefault();
    const { username, password } = this.state;
    await this.props.onSubmit(username, password);
    // let's wait for API response and then set
    // username and password filed to empty state
    this.setState({ username: '', password: '' });
  }

  renderLoginError({ type, title } = {}) {
    return type ? (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              <ErrorIcon />
              {title}
            </span>
          }
        />
      </Snackbar>
    ) : '';
  }

  render() {
    const { visibility, onCancel, error } = this.props;
    const { username, password } = this.state;
    console.log('username', username);
    return (
      <div className="login">
        <Dialog
          onClose={onCancel}
          open={visibility}
          maxWidth="md"
          aria-labelledby="login-dialog"
        >
          <DialogTitle id="login-dialog">Login</DialogTitle>
          <DialogContent>
            {this.renderLoginError(error)}
            <br />
            <TextField
              label="Username"
              placeholder="Please type your username"
              value={username}
              onChange={() => this.setCredentials.bind(this, 'username')}
              margin="normal"
              required
              autoFocus
            />

            <br />
            <br />
            <TextField
              label="Password"
              type="password"
              placeholder="Please type your password"
              value={password}
              onChange={() => this.setCredentials.bind(this, 'password')}
              margin="normal"
              required
            />
          </DialogContent>
          <DialogActions className="dialog-footer">
            <Button
              onClick={onCancel}
              className="cancel-login-button"
              color="inherit"
            >
              Cancel
              </Button>
            <Button
              className="login-button"
              onClick={this.submitCredentials}
              color="inherit"
            >
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}
