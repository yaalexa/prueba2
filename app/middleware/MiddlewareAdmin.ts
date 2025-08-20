
export default class MiddlewareAdmin {
  public async handle({ request, response }, next) {
    const usuario = request['usuario']
    if (!usuario || usuario.roleId !== 1) {
      return response.forbidden({ mensaje: 'Solo administradores' })
    }
    await next()
  }
}