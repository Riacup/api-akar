'use strict'

const Admin = use('App/Models/Admin')
const Database = use('Database')
const Helpers = use('Helpers')

class AdminController {
    //auth admin
    async postLoginApi({ request, auth }) {
        const { email, password } = request.all()
        return auth
        .authenticator('admin')
        .attempt(email, password)
    }
    async postLogoutApi({ auth, response }) {
        const apiToken = auth.getAuthHeader()
        const bye = await (auth.current.user.nama)
        await auth
        .authenticator('admin')
        .revokeTokens([apiToken])
        return response.send({ 
            message: 'Logout successfull!',
            bye
        })
    }
    
    async postLogoutApiAll({ auth, response }) {
        await auth
        .authenticator('admin')
        .revokeTokens()
        return response.send({ message: 'Logout successfully!'})
    }
    //admin edit

    async index({ response }){
        const admin = await Admin.all()

        response.status(200).json({
            message: 'Here are your admin',
            data: admin
          })
    }

    async store({ request, response }) {
        const { email, password } = request.post()
    
        const admin = await Admin.create({ email, password })
    
        response.status(201).json({
          message: 'Successfully created new admin',
          data: admin
        })
    }
}

module.exports = AdminController
