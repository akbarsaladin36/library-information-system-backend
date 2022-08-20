const express = require('express')
const Route = express.Router()
const authRoutes = require('../modules/auth/auth_routes')
const userRoutes = require('../modules/users/users_routes')
const bookRoutes = require('../modules/books/books_routes')
const cartBookRoutes = require('../modules/cart_books/cart_books_routes')

Route.use('/auth', authRoutes)
Route.use('/users', userRoutes)
Route.use('/books', bookRoutes)
Route.use('/carts', cartBookRoutes)

module.exports = Route
