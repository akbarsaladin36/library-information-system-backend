const helper = require('../../helpers/helper')
const bcrypt = require('bcrypt')
const userModel = require('./users_model')

module.exports = {
    allUser: async (req, res) => {
        try {
            const result = await userModel.GetAllUsersData()
            if(result.length > 0) {
                return helper.response(res, 200, 'All users is succesfully appeared!', result)
            } else {
                return helper.response(res, 400, 'All users is empty. Please create a new user data now!', null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    oneUser: async (req, res) => {
        try {
            const { id } = req.params
            const result = await userModel.GetOneUserData(id)
            if(result.length > 0) {
                return helper.response(res, 200, `The user id ${id} is succesfully appeared`, result)
            } else {
                return helper.response(res, 400, `The user id ${id} is not found`, null)
            }
        } catch(error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    filterByRole: async (req, res) => {
        try {
            const { searchRole } = req.query
            const result = await userModel.FilterUserByRole(searchRole)
            if(result.length > 0) {
                return helper.response(res, 200, `All users with role ${searchRole} is succesfully appeared`, result)
            } else {
                return helper.response(res, 400, `The result for all users with role ${searchRole} is empty!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    createUser: async (req, res) => {
        try {
            const { userName, userPassword, userFirstName, userLastName, userAddress, userPhoneNumber, userRole } = req.body
            const salt = bcrypt.genSaltSync(10)
            const userEncryptPassword = bcrypt.hashSync(userPassword, salt)
            const setData = {
                user_email: userName + '@lis_test.com',
                user_username: userName,
                user_password: userEncryptPassword,
                user_first_name: userFirstName,
                user_last_name: userLastName,
                user_address: userAddress,
                user_phone_number: userPhoneNumber,
                user_role: userRole,
                user_verify: 'N',
                user_created_at: new Date(Date.now())
            }
            const result = await userModel.CreateNewUserData(setData)
            return helper.response(res, 200, 'A new user is succesfully created!', result)
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    updateUser: async (req, res) => {
        try {
            const { id } = req.params
            const { userFirstName, userLastName, userAddress, userPhoneNumber } = req.body
            const checkData = await userModel.GetOneUserData(id)
            if(checkData.length > 0) {
                const setData = {
                    user_first_name: userFirstName,
                    user_last_name: userLastName,
                    user_address: userAddress,
                    user_phone_number: userPhoneNumber,
                    user_updated_at: new Date(Date.now())
                }
                const result = await userModel.UpdateOneUserData(setData, id)
                return helper.response(res, 200, 'Your data is succesfully updated!', result)
            } else {
                return helper.response(res, 400, `The user with id ${id} is not found!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params
            const checkData = await userModel.GetOneUserData(id)
            if(checkData.length > 0) {
                const result = await userModel.DeleteOneUserData(id)
                return helper.response(res, 200, 'This user data is succesfully deleted!', result)
            } else {
                return helper.response(res, 400, `The user with id ${id} is not found!`, null)
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 404, 'Bad Request', null)
        }
    }
}