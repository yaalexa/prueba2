import jwt from 'jsonwebtoken'
import env from '#start/env'

export default class AuthJWT {
  public async handle({ request, response }, next) {
    const authHeader = request.header('Authorization')
    if (!authHeader) {
      return response.unauthorized({ mensaje: 'Token no proporcionado' })
    }

    const token = authHeader.split(' ')[1]
    try {
      const payload = jwt.verify(token, env.get('APP_KEY'))
      request['usuario'] = payload
      await next()
    } catch {
      return response.unauthorized({ mensaje: 'Token inválido o expirado' })
    }
  }
}