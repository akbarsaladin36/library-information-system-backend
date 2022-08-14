const express = require('express')
const router = express.Router()
const userController = require('./users_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, userController.allUser)
router.get('/search-role/', authMiddleware.userAuthentication, authMiddleware.isAdmin, userController.filterByRole)
router.get('/:id', authMiddleware.userAuthentication, userController.oneUser)
router.post('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, userController.createUser)
router.patch('/:id', authMiddleware.userAuthentication, authMiddleware.isMember, userController.updateUser)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, userController.deleteUser)


module.exports = router