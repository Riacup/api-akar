'use strict'

const User = use('App/Models/User')
const Database = use('Database')

const fs = use('fs')
const Helpers = use('Helpers')
const readFile = Helpers.promisify(fs.readFile)
const Route = use('Route')

class UserController {
      //auth user
    async postLoginApi({ request, auth }) {
        const { email, password } = request.all()
        return auth
        .authenticator('user')
        .attempt(email, password)
    }
    
    // async getProfileApi({ response, auth }) {
    //     // return response.send(auth.current.user)

    //     const profile = await Database
    //         .select('mahasiswa.id','mahasiswa.nama', 'mahasiswa.pt_id', 'nama_pt' , 'mahasiswa.fakultas_id' , 'nama_fakultas', 'mahasiswa.prodi_id', 'nama_prodi', 'email' , 'nim' , 'password', 'gambar')
    //         .table('mahasiswa')
    //         .innerJoin('perguruan_tinggi', 'perguruan_tinggi.id', 'mahasiswa.pt_id')
    //         .innerJoin('fakultas','fakultas.id', 'mahasiswa.fakultas_id')
    //         .innerJoin('prodi','prodi.id','mahasiswa.prodi_id')
    //         .where('mahasiswa.id', auth.current.user.id)
        

    //     // const { nama } = await auth.current.user

    //     return response.json({
    //         profile
    //     })
    // }
    // async updateProfileApi({ response, auth, request }) {
    //     const { nama , nim  } = request.post()

    //       const mahasiswa = await auth.current.user
    //       if(!mahasiswa){
    //           response.status(200).json({
    //               message:'Data not found'
    //           })
    //       }else {
    //           mahasiswa.nama = nama
    //           mahasiswa.nim = nim

    //           await mahasiswa.save()

    //           response.status(200).json({
    //             message:'data updated',
    //             data : mahasiswa
    //         })
    //       }
    // }
    // async updateFotoApi({ response, auth, request }) {
    //     // const { pic } = request.post()

    //     const pic = request.file('pic', {
    //         types: ['image'],
    //         size: '2mb'
    //       })
          
    //       const nam = new Date().getTime()+'.'+pic.subtype
    //       await pic.move(Helpers.publicPath('uploads'), {
    //         name: nam,  //new Date().getTime()+'.'+pic.subtype
    //         overwrite: true
    //       })

    //       const tambah = await Database 
    //         .table('mahasiswa')
    //         .where('mahasiswa.id', auth.current.user.id)
    //         .update({gambar: nam}) //`${Helpers.publicPath(`uploads/${nam}`)}`
        
    //       if (!pic.moved()) {
    //         return pic.error()
    //       }
    //       return 'Updated'

    //       const foto = await Database
    //       .select('image')
    //       .table('mahasiswa')
    //       .where('id' , auth.current.user.id)
    // }
    // async getFoto({response , auth, request}){

    //     const potoh = await Database
    //         .select('image')
    //         .table('mahasiswa')
    //         .where('id' , auth.current.user.id)
        
    //     return response.download(Helpers.publicPath(`uploads/${potoh[0].image}`))
    // }
    
    async postLogoutApi({ auth, response }) {
        const apiToken = auth.getAuthHeader()
        const bye = await (auth.current.user.nama)
        await auth
        .authenticator('user')
        .revokeTokens([apiToken])
        return response.send({ 
            message: 'Logout successfull!',
            bye
        })
    }
    
    async postLogoutApiAll({ auth, response }) {
        await auth
        .authenticator('user')
        .revokeTokens()
        return response.send({ message: 'Logout successfully!'})
    }

    // async getPendaftaranApi({ auth, response }){
    //     //const mahasiswa = await auth.current.user
    //     const { id } = await auth.current.user
    //     const auth_id = id

    //     const riwayat = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('mahasiswa.id', auth_id)


    //     const aktif = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 0)
    //         .where('mahasiswa.id', auth_id)

    //     const diterima = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 1)
    //         .where('pendaftaran.is_anggota', 1)
    //         .where('mahasiswa.id', auth_id)

    //     const ditolak = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 1)
    //         .where('pendaftaran.is_anggota', 0)
    //         .where('mahasiswa.id', auth_id)

    //     const anggota = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 1)
    //         .where('pendaftaran.is_anggota', 1)
    //         .where('pendaftaran.is_alumni', 0)
    //         .where('mahasiswa.id', auth_id)
        
    //     const alumni = await Database
    //         .select('pendaftaran.id','nama_ukm', 'is_anggota', 'is_alumni','ukm.id', 'deskripsi_ukm')
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 1)
    //         .where('pendaftaran.is_anggota', 1)
    //         .where('pendaftaran.is_alumni', 1)
    //         .where('mahasiswa.id', auth_id)
                

    //     response.status(200).json({
    //         message: 'Berikut daftar pendaftaran dengan nama ' + auth.current.user.nama ,
    //         // data : mahasiswa,
    //         riwayat,
    //         aktif,
    //         diterima,
    //         ditolak,
    //         anggota,
    //         alumni
    //     })
    // }

    // async pt({ response , auth }){
    //     const pt = await PerguruanTinggi.all()

    //     response.status(200).json({
    //         message: 'Here are your pt',
    //         pt
        
    //       })
    // }
    // async fakultas({ response , auth }){
    //     // const fakultas = await Fakultas.all()
    //     const fakultas = await Database 
    //         .select('fakultas.id', 'nama_fakultas', 'pt_id' , 'nama_pt')
    //         .table('fakultas')
    //         .innerJoin('perguruan_tinggi' , 'perguruan_tinggi.id' , 'fakultas.pt_id')
    //         .orderBy('pt_id', 'desc')

    //     response.status(200).json({
    //         message: 'Here are your pt',
    //         fakultas
        
    //       })
    // }
    // async prodi({ response , auth }){
    //     const prodi = await Database 
    //         .select('prodi.id', 'nama_prodi', 'fakultas_id' , 'nama_pt')
    //         .table('prodi')
    //         .innerJoin('fakultas', 'fakultas_id', 'fakultas.id')
    //         .innerJoin('perguruan_tinggi' , 'perguruan_tinggi.id' , 'fakultas.pt_id')

    //         .orderBy('pt_id', 'desc')

    //     response.status(200).json({
    //         message: 'Here are your pt',
    //         prodi
        
    //       })
    // }
    // async find_fakultas({ params, response }) {
    //     const pt = await PerguruanTinggi.find(params.id)

    //     const fakultas = await Database
    //         .select('id','nama_fakultas')
    //         .table('fakultas')
    //         .where('pt_id' , params.id)

    //     response.status(200).json({
    //         message: 'berikut daftar fakultas dari pt : ' + pt.nama_pt ,
    //         // pt,
    //         fakultas
    //     })
    //   }
    //   async find_prodi({ params, response }) {
    //     const fakultas = await Fakultas.find(params.id)
    //     const prodi = await Database
    //         .select('id','nama_prodi')
    //         .table('prodi')
    //         .where('fakultas_id' , params.id)

    //     response.status(200).json({
    //         message: 'berikut daftar prodi dari fakultas : ' + fakultas.nama_fakultas,
    //         // pt,
    //         prodi
    //     })
    //   }


    //admin edit

    async index({ response }){
        const users = await User.all()

        response.status(200).json({
            message: 'Here are your users',
            data: users
          })
    }

    async store({ request, response }) {
        const { nama, nik, email, password } = request.post()
        const user = await User.create({ nama, nik, email, password })
    
        response.status(201).json({
          message: 'Successfully created a new user',
          data: user
        })
      }
    
    //   async show({ auth, response, params }) {
    //     // const mahasiswa = await Mahasiswa.find(params.id)
    //     //const maha = await (auth.current.user)
        
    //     const mahasiswa = await Database
    //         .select('mahasiswa.id','mahasiswa.nama', 'mahasiswa.pt_id', 'nama_pt' , 'mahasiswa.fakultas_id' , 'nama_fakultas', 'mahasiswa.prodi_id', 'nama_prodi', 'email' , 'nim' , 'password', 'gambar')
    //         .table('mahasiswa')
    //         .innerJoin('perguruan_tinggi', 'perguruan_tinggi.id', 'mahasiswa.pt_id')
    //         .innerJoin('fakultas','fakultas.id', 'mahasiswa.fakultas_id')
    //         .innerJoin('prodi','prodi.id','mahasiswa.prodi_id')
    //         .where('mahasiswa.id', params.id)

    //     const riwayat_pendafaran = await Database
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')

    //     const pendaftaran_aktif = await Database
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_diterima', 0)

    //     const diterima = await Database
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_anggota', 1)
    //         .where('pendaftaran.is_diterima', 1)

    //     const ditolak = await Database
    //         .table('mahasiswa')
    //         .innerJoin('pendaftaran','mahasiswa.id', 'pendaftaran.mahasiswa_id')
    //         .innerJoin('ukm','ukm.id','pendaftaran.ukm_id')
    //         .where('pendaftaran.is_anggota', 0)
    //         .where('pendaftaran.is_diterima', 1)
                

    //     response.status(200).json({
    //         message: 'Succesfully find a mahasiswa',
    //         data : mahasiswa,
    //         riwayat_pendafaran,
    //         pendaftaran_aktif,
    //         diterima,
    //         ditolak
    //         //maha

    //     })
    //   }

    //   async update({ params, request, response }){
    //       const { nama } = request.post()

    //       const mahasiswa = await Mahasiswa.find(params.id)
    //       if(!mahasiswa){
    //           response.status(200).json({
    //               message:'Data not found'
    //           })
    //       }else {
    //           mahasiswa.nama = nama

    //           await mahasiswa.save()

    //           response.status(200).json({
    //             message:'data found',
    //             data : mahasiswa
    //         })
    //       }
    //   }

      async delete({ params, response }){
            const user = await User.find(params.id)

            if(!user){
                response.status(200).json({
                    message:'Data not found'
                })
            }else {
                await user.delete()
  
                response.status(200).json({
                  message:'data deleted',
                  data : user
              })
            }
            

      }

}

module.exports = UserController
