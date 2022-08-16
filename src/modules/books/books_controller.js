const helper = require('../../helpers/helper')
const booksModel = require('./books_model')

module.exports = {
    allBooks: async (req, res) => {
        try {
            const result = await booksModel.GetAllBooksData()
            if(result.length > 0) {
                return helper.response(res, 200, 'All books are succesfully appeared!', result)
            } else {
                return helper.response(res, 400, 'All books data are empty. Please create a new book data first!', null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneBook: async (req, res) => {
        try {
            const { id } = req.params
            const result = await booksModel.GetOneBookData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `A book id ${id} data is succesfully appeared!`, result)
            } else {
                return helper.response(res, 400, `A book id ${id} data is not found! Please try again!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createBook: async (req, res) => {
        try {
            const { bookName, bookDesc, bookStatus } = req.body
            const setData = {
                book_name: bookName,
                user_id: req.decodeToken.user_id,
                book_desc: bookDesc,
                book_status: bookStatus,
                book_created_at: new Date(Date.now())
            }
            const result = await booksModel.CreateNewBookData(setData)
            return helper.response(res, 200, 'A new book data is created succesfully!', result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateBook: async (req, res) => {
        try {
            const { id } = req.params
            const { bookName, bookDesc, bookStatus } = req.body
            const checkData = await booksModel.GetOneBookData(id)
            if(checkData.length > 0) {
                const setData = {
                    book_name: bookName,
                    book_desc: bookDesc,
                    book_status: bookStatus,
                    book_updated_at: new Date(Date.now())
                }
                const result = await booksModel.UpdateOneBookData(setData, id)
                return helper.response(res, 200, `A book id ${id} data is updated succesfully!`, result)
            } else {
                return helper.response(res, 400, `A book id ${id} data is not found!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteBook: async (req, res) => {
        try {
            const { id } = req.params
            const checkData = await booksModel.GetOneBookData(id)
            if(checkData.length > 0) {
                const result = await booksModel.DeleteOneBookData(id)
                return helper.response(res, 200, `A book id ${id} data is deleted succesfully!`, result)
            } else {
                return helper.response(res, 400, `A book id ${id} data is not found!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}