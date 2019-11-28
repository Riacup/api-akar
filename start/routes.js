'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const fs = use('fs')
const Helpers = use('Helpers')
const readFile = Helpers.promisify(fs.readFile)

const Database = use('Database')

Route.group(()=>{
   //auth user
    Route.post('login', 'UserController.postLoginApi').as('loginApi')
    Route.post('logout', 'UserController.postLogoutApi').as('logoutApi').middleware(['auth:user'])
    Route.post('logoutAll', 'UserController.postLogoutApiAll').as('logoutApiAll').middleware(['auth:user'])

    Route.get('users', 'UserController.index')
    Route.post('register', 'UserController.store')
    Route.get('user/:id', 'UserController.show')
        }).prefix('api/user')


Route.group(()=>{
    //auth admin ukm
    Route.post('login', 'AdminController.postLoginApi')
    Route.post('logout', 'AdminController.postLogoutApi').middleware(['auth:admin'])
    // Route.post('logoutAll', 'AdminController.postLogoutApiAll').middleware(['auth:admin'])

    //admin edit
    Route.get('admins', 'AdminController.index')
    Route.post('daftar', 'AdminController.store')
    Route.get('admin/:id', 'AdminController.show').middleware(['auth:user'])
}).prefix('api/admin')

