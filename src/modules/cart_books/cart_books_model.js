const connection = require('../../config/mysql')

module.exports = {
    GetAllCartBooksData: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM carts', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    GetAllCartBooksByUserIdData: (userId) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM carts WHERE user_id = ?', userId,(error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    GetOneCartBooksData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM carts WHERE cart_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    CreateNewCartData: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO carts SET ?', setData, (error,result) => {
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
    UpdateOneCartData: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE carts SET ? WHERE cart_id = ?', [setData, id], (error, result) => {
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
    DeleteOneCartData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM carts WHERE user_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}