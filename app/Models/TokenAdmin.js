'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class TokenAdmin extends Model {
    static boot () {
        super.boot()
        this.addTrait('NoTimestamp')
    }
    static get table () {
        return 'token_admin'
      }
}

module.exports = TokenAdmin
