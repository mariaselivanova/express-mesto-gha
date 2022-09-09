const routerUser = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateUser,
  validateAvatar,
} = require('../middlewares/validation');

routerUser.get('/', getUsers);
routerUser.get('/:userId', validateUserId, getUserById);
routerUser.get('/me', getUser);
routerUser.patch('/me', validateUpdateUser, updateProfile);
routerUser.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = routerUser;
