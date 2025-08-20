import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import bcrypt from 'bcrypt'

export default class ControladorAuth {
  public async iniciarSesion({ request, response }: HttpContext) {
    try {
      const { email, password } = request.body() 

      const usuario = await Usuario.findBy('email', email)
      if (!usuario) {
        return response.unauthorized({ mensaje: 'Credenciales inválidas' })
      }

      const passwordValido = await bcrypt.compare(password, usuario.password)
       

      if (!passwordValido) {
        return response.unauthorized({ mensaje: 'Credenciales inválidas' })
      }

      const token = jwt.sign(
        { id: usuario.id, roleId: usuario.roleId },
        env.get('APP_KEY'),
        { expiresIn: '1h' }
      )

      return { token, usuario }
    } catch (error) {
      return response.internalServerError({ mensaje: 'Error al iniciar sesión', error: error.message })
    }
  }
}

