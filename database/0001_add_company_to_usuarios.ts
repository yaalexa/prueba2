import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('usuarios', (t) => {
      t.integer('company_id').unsigned().notNullable()
        .references('id').inTable('companies')
        .onDelete('CASCADE').index()
    })
  }

  async down() {
    this.schema.alterTable('usuarios', (t) => {
      t.dropColumn('company_id')
    })
  }
}
