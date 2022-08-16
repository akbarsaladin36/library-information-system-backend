const connection = require('../../config/mysql')

module.exports = {
    GetAllBooksData: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM books', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    GetOneBookData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM books WHERE book_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    GetBookDataCondition: (data) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM books WHERE ?', data, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    CreateNewBookData: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO books SET ?', setData, (error, result) => {
                if(!error) {
                    const newResult = {
                        id: result.insertId,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    UpdateOneBookData: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE books SET ? WHERE book_id = ?', [setData, id], (error, result) => {
                if(!error) {
                    const newResult = {
                        id: id,
                        ...setData
                    }
                    resolve(newResult)
                } else {
                    reject(new Error(error))
                }
            })
        })
    },
    DeleteOneBookData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM books WHERE book_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}