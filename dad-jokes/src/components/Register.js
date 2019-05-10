import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Register extends Component {
  state = {
    user: {
      username: '',
      password: ''
    }
  };
  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [e.target.id]: e.target.value
      }
    }));
  };
  onSubmit = e => {
    e.preventDefault();

    axios.post('http://localhost:3300/api/register', this.state.user);
    this.props.history.push('/login');
  };
  render() {
    return (
      <div className="auth">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-content">
            <div className="form-item">
              <label htmlFor="username">Username</label>
              <input
                onChange={this.onChange}
                type="text"
                id="username"
                value={this.state.user.username}
                placeholder="Enter username"
              />
            </div>
            <div className="form-item">
              <label htmlFor="password">Password</label>
              <input
                onChange={this.onChange}
                type="password"
                id="password"
                value={this.state.user.password}
                placeholder="Enter password"
              />
            </div>
            <button type="submit">Register</button>
            <div className="exist">
              <p>Already have an account?</p>
              <Link to="/login">Login</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
