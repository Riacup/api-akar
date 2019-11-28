'use strict'

class AuthController {
// tambahkan ini
async postLoginApi({ request, auth }) {
    const { email, password } = request.all()
    return auth
      .authenticator('api')
      .attempt(email, password)
  }
  
  async getProfileApi({ response, auth }) {
    return response.send(auth.current.user)
  }
  
  async postLogoutApi({ auth, response }) {
    const apiToken = auth.getAuthHeader()
    await auth
      .authenticator('api')
      .revokeTokens([apiToken])
    return response.send({ message: 'Logout successfully!'})
  }
  
  async postLogoutApiAll({ auth, response }) {
    await auth
      .authenticator('api')
      .revokeTokens()
    return response.send({ message: 'Logout successfully!'})
  }
}

module.exports = AuthController
