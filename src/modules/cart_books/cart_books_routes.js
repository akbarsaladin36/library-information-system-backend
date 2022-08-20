const express = require('express')
const router = express.Router()
const cartBookController = require('./cart_books_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, cartBookController.allCarts)
router.get('/your-cart/:id', authMiddleware.userAuthentication, authMiddleware.isMember, cartBookController.allCartbyUserId)
router.get('/:id', authMiddleware.userAuthentication, cartBookController.cartDetail)
router.post('/:bookId', authMiddleware.userAuthentication, authMiddleware.isMember, cartBookController.addCart)
router.patch('/verify-cart/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, cartBookController.verifyCart)
router.patch('/:id', authMiddleware.userAuthentication, authMiddleware.isMember, cartBookController.updateCart)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, cartBookController.deleteCart)

module.exports = router