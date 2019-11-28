'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TokenUser extends Model {
    static boot () {
        super.boot()
        this.addTrait('NoTimestamp')
    }
    static get table () {
        return 'token_user'
      }
}

module.exports = TokenUser
