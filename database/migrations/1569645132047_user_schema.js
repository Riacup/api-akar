'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('user', (table) => {
      table.increments()
      table.string('nama').notNullable()
      table.string('nik').notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
    })
  }

  down () {
    this.drop('user')
  }
}

module.exports = UserSchema
