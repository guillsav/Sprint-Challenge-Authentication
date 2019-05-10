import React from 'react';
import {withRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import JokesList from './components/JokesList';

import './App.css';

class App extends React.Component {
  state = {
    isLoggedIn: false
  };

  switchState = num => {
    if (num === 1) {
      this.setState({
        isLoggedIn: true
      });
    } else {
      this.setState({
        isLoggedIn: false
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar
          {...this.props}
          switchState={this.switchState}
          isLoggedIn={this.state.isLoggedIn}
        />
        <Route exact path="/" render={props => <Register {...props} />} />
        <Route
          path="/login"
          render={props => <Login {...props} switchState={this.switchState} />}
        />
        <Route path="/jokes" component={JokesList} />
      </div>
    );
  }
}

export default withRouter(App);
