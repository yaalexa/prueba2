import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Rol from '#models/Rol'
import Company from '#models/company'
export default class Usuario extends BaseModel {
  public static table = 'usuarios' //
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare roleId: number

  @column()
  declare companyId: number

  @belongsTo(() => Rol, { foreignKey: 'roleId' })
  declare rol: BelongsTo<typeof Rol>

  @belongsTo(() => Company, { foreignKey: 'companyId' })
  declare company: BelongsTo<typeof Company>
}
