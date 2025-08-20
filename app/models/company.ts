import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Company extends BaseModel {
  public static table = 'companies'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare isActive: boolean
}
