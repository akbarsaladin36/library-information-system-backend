const connection = require('../../config/mysql')

module.exports = {
    GetAllUsersData: () => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    GetOneUserData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users WHERE user_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    FilterUserByRole: (searchRole) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM users WHERE user_role LIKE '%${searchRole}%'`, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    },
    CreateNewUserData: (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', setData, (error, result) => {
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
    UpdateOneUserData: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE user_id = ?', [setData, id], (error, result) => {
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
    DeleteOneUserData: (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE user_id = ?', id, (error, result) => {
                !error ? resolve(result) : reject(new Error(error))
            })
        })
    }
}