import React, {Component} from 'react';
import axios from 'axios';
import requireAuth from '../utils/axiosAuth';
import Joke from './Joke';

class JokesList extends Component {
  state = {
    jokes: []
  };
  async componentDidMount() {
    const res = await axios.get('http://localhost:3300/api/jokes');

    this.setState({
      jokes: res.data
    });
  }
  renderJokes = () => {
    if (this.state.jokes.length > 0) {
      return this.state.jokes.map(joke => {
        return <Joke key={joke.id} joke={joke} />;
      });
    } else {
      return <h2>Loading...</h2>;
    }
  };
  render() {
    return <>{this.renderJokes()}</>;
  }
}

export default requireAuth(JokesList);
