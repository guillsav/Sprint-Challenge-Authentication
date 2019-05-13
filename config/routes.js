const axios = require('axios');
const bcrypt = require('bcryptjs');
const Users = require('./user-models');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const secret = require('./secret');

const {authenticate} = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', validation, register);
  server.post('/api/login', validation, login);
  server.get('/api/jokes', authenticate, getJokes);
};

function validation(req, res, next) {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(4)
      .max(255)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{4,255}$/)
      .required()
  });

  Joi.validate(req.body, schema, (e, result) => {
    if (e) {
      res
        .status(400)
        .json({message: 'Please provide a username and password!'});
    } else {
      next();
    }
  });
}

function register(req, res, next) {
  // implement user registration
  let user = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  Users.addUser(user)
    .then(saved => {
      res.status(200).json(saved);
      next();
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json(err.message);
    });
}

async function login(req, res, next) {
  // implement user login
  try {
    const {username, password} = req.body;
    const foundUser = await Users.getUserByName(username);
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (foundUser && isMatch) {
      const token = generateToken(foundUser);
      res.status(200).json({message: `Welcome ${foundUser.username}!`, token});
      next();
    } else {
      res.status(404).json({message: 'Invalid credentials!'});
    }
  } catch (e) {
    res.status(500).json({errorMessage: `Server error couldn't login!`});
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: {accept: 'application/json'}
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({message: 'Error Fetching Jokes', error: err});
    });
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}
