const routerUser = require('express').Router();

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  getUserById,
} = require('../controllers/users');

const {
  userIdValidation,
  updateProfileValidation,
  avatarValidation,
} = require('../middlewares/validation');

routerUser.get('/', getUsers);
routerUser.get('/me', getUser);
routerUser.get('/:userId', userIdValidation, getUserById);
routerUser.patch('/me', updateProfileValidation, updateProfile);
routerUser.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = routerUser;
