import Rol from '#models/rol'

export default class ControladorRoles {
  public async crear({ request, response }) {
    try {
      const { nombre } = request.body()
      if (!nombre) {
        return response.badRequest({ mensaje: 'Nombre de rol requerido' })
      }

      const rol = await Rol.create({ nombre })
      return response.created(rol)
    } catch (error) {
      return response.internalServerError({ mensaje: 'Error al crear rol' })
    }
  }
}
