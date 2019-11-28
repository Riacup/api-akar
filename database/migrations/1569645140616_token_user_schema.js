'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TokenUserSchema extends Schema {
  up () {
    this.create('token_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('user').onDelete('cascade')
      table.string('token', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
    })
  }

  down () {
    this.drop('token_user')
  }
}

module.exports = TokenUserSchema
