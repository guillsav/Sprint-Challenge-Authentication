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
  onSubmit = async e => {
    try {
      e.preventDefault();

      const res = await axios.post(
        'http://localhost:3300/api/login',
        this.state.user
      );
      const {token} = res.data;
      localStorage.setItem('jwt', token);
      this.props.switchState(1);
      this.props.history.push('/jokes');
    } catch (err) {
      console.log(err.message);
      this.props.switchState(0);
    }
  };
  render() {
    return (
      <div className="auth">
        <h2>Login</h2>
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
            <button type="submit">Login</button>
            <div className="exist">
              <p>Don't have an account?</p>
              <Link to="/">Register</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
