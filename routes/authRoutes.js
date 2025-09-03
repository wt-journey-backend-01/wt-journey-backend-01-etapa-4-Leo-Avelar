const express = require('express')
const router = express.Router();
const controller = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/auth/login', controller.login);
router.post('/auth/logout',  controller.logout);
router.post('/auth/register', controller.register);
router.delete('/users/:id', authMiddleware, controller.deleteUser);
router.get('/usuarios/me', authMiddleware, controller.userInformation);

module.exports = router;