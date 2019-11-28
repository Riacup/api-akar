'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')

class CekOprec {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Request} ctx.response
   * @param {Function} next
   */
  async handle (response, next) {
    // call next to advance the request
    const oprec = await Database
      .select('oprec_status')
      .table('ukms')

    const status = oprec[0].oprec_status

    if(status==0){

      return response.json({
        msg : 'Pendaftaran Tidak Dibuka'
      })

    }
    await next()
  }
}

module.exports = CekOprec
