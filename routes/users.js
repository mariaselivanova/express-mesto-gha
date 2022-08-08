const routerUser = require('express').Router();

const {
  getUsers,
  createUser,
  getUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:userId', getUser);
routerUser.post('/users', createUser);
routerUser.patch('/users/me', updateProfile);
routerUser.patch('/users/me/avatar', updateAvatar);

module.exports = routerUser;
