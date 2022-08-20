const helper = require('../../helpers/helper')
const cartBookModel = require('./cart_books_model')

module.exports = {
    allCarts: async (req, res) => {
        try {
            const result = await cartBookModel.GetAllCartBooksData()
            if(result.length > 0) {
                return helper.response(res, 200, 'All carts is succesfully appeared!', result) 
            } else {
                return helper.response(res, 400, 'All carts is empty! Please create a new one!', null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    allCartbyUserId: async (req, res) => {
        try {
            const { id } = req.params
            const result = await cartBookModel.GetAllCartBooksByUserIdData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `All carts by user id ${id} is succesfully appeared!`, result)
            } else {
                return helper.response(res, 400, `All carts from user id ${id} is empty!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    cartDetail: async (req, res) => {
        try {
            const { id } = req.params
            const result = await cartBookModel.GetOneCartBooksData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `The cart id ${id} detail is succesfully appeared!`, result)
            } else {
                return helper.response(res, 400, `The cart id ${id} detail is not found! Please try again!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    addCart: async (req, res) => {
        try {
            const { bookId } = req.params
            const { cartBookQty, cartBookDesc } = req.body
            const setData = {
                book_id: bookId,
                user_id: req.decodeToken.user_id,
                cart_qty: cartBookQty,
                cart_desc: cartBookDesc,
                cart_status: 'pending'
            }
            const result = await cartBookModel.CreateNewCartData(setData)
            return helper.response(res, 200, 'A new cart is succesfully created!', result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    verifyCart: async (req, res) => {
        try {
            const { id } = req.params
            const { cartStatus } = req.body
            const checkCart = await cartBookModel.GetOneCartBooksData(id)
            if(checkCart.length > 0) {
                const setData = {
                    cart_status: cartStatus
                }
                const result = await cartBookModel.UpdateOneCartData(setData, id)
                return helper.response(res, 200, `The status for cart id ${id} is succesfully ${cartStatus}`, result)
            } else {
                return helper.response(res, 400, `The cart id ${id} is not found! Please try again!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateCart: async (req, res) => {
        try {
            const { id } = req.params
            const { cartBookQty, cartBookDesc } = req.body
            const checkCart = await cartBookModel.GetOneCartBooksData(id)
            if(checkCart.length > 0) {
                const setData = {
                    cart_qty: cartBookQty,
                    cart_desc: cartBookDesc,
                    cart_updated_at: new Date(Date.now())
                }
                const result = await cartBookModel.UpdateOneCartData(setData, id)
                return helper.response(res, 200, `The cart id ${id} data is succesfully updated!`, result)
            } else {
                return helper.response(res, 400, `The cart id ${id} is not found! Please try again!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteCart: async (req, res) => {
        try {
            const { id } = req.params
            const checkCart = await cartBookModel.GetOneCartBooksData(id)
            if(checkCart.length > 0) {
                const result = await cartBookModel.DeleteOneCartData(id)
                return helper.response(res, 200, `The cart id ${id} data is succesfully updated!`, result)
            } else {
                return helper.response(res, 400, `The cart id ${id} data is not found! Please try again!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}