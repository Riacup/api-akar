'use strict'

/*
|--------------------------------------------------------------------------
| UkmSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */

const PerguruanTinggi = use('App/Models/PerguruanTinggi')

class PerguruanTinggiSeeder {
  async run () {
    const p1 = new PerguruanTinggi()
    p1.nama_pt = 'UGM'
    await p1.save()
  }
  async run () {
    const p2 = new PerguruanTinggi()
    p2.nama_pt = 'UNY'
    await p2.save()
  }
}

module.exports = PerguruanTinggiSeeder
