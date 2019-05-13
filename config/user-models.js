const db = require('../database/dbConfig');

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  addUser
};

function getUsers() {
  return db('users').select('id', 'username');
}

function getUserById(id) {
  return db('users')
    .where({id}, 'id')
    .first();
}

function getUserByName(username) {
  return db('users')
    .where({username}, 'username')
    .first();
}

function addUser(user) {
  return db('users')
    .insert(user)
    .then(([id]) => getUserById(id));
}
