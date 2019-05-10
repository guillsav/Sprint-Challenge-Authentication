import React from 'react';

const Joke = props => {
  console.log(props);
  return (
    <div className="Joke">
      <h6>{props.joke.joke}</h6>
    </div>
  );
};

export default Joke;
