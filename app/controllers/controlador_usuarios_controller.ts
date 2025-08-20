import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Rol from '#models/rol'
import bcrypt from 'bcrypt'

export default class ControladorUsuarios {
  public async crear({ request, response }: HttpContext) {
    try {
      const body = request.body()
      const email = body.email
      const password = body.password
      const roleId = body.roleId

      const tenant = (request as any).tenant
      if (!tenant) return response.badRequest({ mensaje: 'Falta tenant' })
      if (!email || !password) return response.json({ mensaje: 'Email y contraseÃ±a requeridos' })

      // Roles globales: solo validar existencia por id
      const rolExiste = await Rol.find(roleId)
      if (!rolExiste) return response.json({ mensaje: 'Rol no encontrado' })

      const passwordCifrada = await bcrypt.hash(password, 10)

      const usuario = await Usuario.create({
                email,
                password: passwordCifrada,
                roleId,
                companyId: tenant.id
              })

    return response.json(usuario)
    } catch (error: any) {
      return response.json({ mensaje: 'Error al crear usuario', error: error.message })
    }
  }

  public async listar({ request, response }: HttpContext) {
    try {
      const tenant = (request as any).tenant
      const usuarios = await Usuario.query()
        .select('usuarios.id', 'usuarios.email', 'roles.nombre as rol')
        .join('roles', 'usuarios.role_id', '=', 'roles.id')
        .where('usuarios.company_id', tenant.id)

      return response.ok(usuarios)
    } catch (error: any) {
      return response.internalServerError({ mensaje: 'Error al listar usuarios', error: error.message })
    }
  }

  public async actualizar({ params, request, response }: HttpContext) {
    try {
      const tenant = (request as any).tenant
      const body = request.body()
      const email = body.email
      const password = body.password
      const roleId = body.roleId

      const usuarioExiste = await Usuario.query()
        .where('id', params.id)
        .andWhere('company_id', tenant.id)
        .first()
      if (!usuarioExiste) return response.notFound({ mensaje: 'Usuario no encontrado' })

      const datos: any = {}
      if (email) datos.email = email
      if (roleId) {
        const rolExiste = await Rol.find(roleId)
        if (!rolExiste) return response.badRequest({ mensaje: 'Rol no encontrado' })
        datos.roleId = roleId
      }
      if (password) datos.password = await bcrypt.hash(password, 10)

      const [usuarioActualizado] = await Usuario.query()
        .where('id', params.id)
        .andWhere('company_id', tenant.id)
        .update(datos)
        .returning('*')

      return response.ok(usuarioActualizado)
    } catch (error: any) {
      return response.json({ mensaje: 'Error al actualizar usuario', error: error.message })
    }
  }

  public async eliminar({ params, request, response }: HttpContext) {
    try {
      const tenant = (request as any).tenant
      const existe = await Usuario.query().where('id', params.id).andWhere('company_id', tenant.id).first()
      if (!existe) return response.json({ mensaje: 'Usuario no encontrado' })

      await Usuario.query().where('id', params.id).andWhere('company_id', tenant.id).delete()
      return response.ok({ mensaje: 'Usuario eliminado con Ã©xito' })
    } catch (error: any) {
      return response.json({ mensaje: 'Error al eliminar usuario', error: error.message })
    }
  }
}
