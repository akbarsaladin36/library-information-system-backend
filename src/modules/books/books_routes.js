const express = require('express')
const router = express.Router()
const booksController = require('./books_controller')
const authMiddleware = require('../../middleware/auth')

router.get('/', authMiddleware.userAuthentication, booksController.allBooks)
router.get('/:id', authMiddleware.userAuthentication, booksController.oneBook)
router.post('/', authMiddleware.userAuthentication, authMiddleware.isAdmin, booksController.createBook)
router.patch('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, booksController.updateBook)
router.delete('/:id', authMiddleware.userAuthentication, authMiddleware.isAdmin, booksController.deleteBook)

module.exports = router