import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Usuario from '#models/usuario'

export default class Rol extends BaseModel {
  public static table = 'roles'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @hasMany(() => Usuario)
  declare usuarios: HasMany<typeof Usuario>
}
