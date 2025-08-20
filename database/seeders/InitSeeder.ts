// database/seeders/InitSeeder.ts
import Company from '#models/company'
import Rol from '#models/rol'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class InitSeeder extends BaseSeeder {
  public async run () {
    const company = await Company.create({
      name: 'Empresa Demo',
      slug: 'empresa-demo',
      isActive: true
    })

    await Rol.create({
      nombre: 'Admin'
    })

    console.log('Empresa creada:', company.toJSON())
  }
}
