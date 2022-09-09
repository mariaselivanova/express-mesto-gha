const routerUser = require('express').Router();

const {
  getUsers,
  getUser,
  getUserInfo,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateUser,
  validateAvatar,
} = require('../middlewares/validation');

routerUser.get('/', getUsers);
routerUser.get('/:userId', validateUserId, getUser);
routerUser.get('/me', getUserInfo);
routerUser.patch('/me', validateUpdateUser, updateProfile);
routerUser.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = routerUser;
