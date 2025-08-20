// app/middleware/tenant_middleware.ts
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class TenantMiddleware {
  public async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const slug = (request.header('x-company') || '').toLowerCase()
    if (!slug) return response.badRequest({ mensaje: 'Falta header x-company' })

    const company = await db.from('companies').where('slug', slug).andWhere('is_active', true).first()
    if (!company) return response.unauthorized({ mensaje: 'Empresa no encontrada o inactiva' })

    ;(request as any).tenant = { id: company.id, slug: company.slug }
    await next()
  }
}
