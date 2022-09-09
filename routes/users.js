const routerUser = require('express').Router();

const {
  getUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

routerUser.get('/', getUsers);
routerUser.get('/:userId', getUser);
routerUser.get('/me', getUserInfo);
routerUser.patch('/me', updateProfile);
routerUser.patch('/me/avatar', updateAvatar);

module.exports = routerUser;
