import router from '@adonisjs/core/services/router'
import MiddlewareAuth from '#middleware/AuthJWT'
import MiddlewareAdmin from '#middleware/MiddlewareAdmin'
import ControladorAutenticacion from '#controllers/controlador_autenticacions_controller'
import ControladorRoles from '#controllers/controlador_roles_controller'
import ControladorUsuarios from '#controllers/controlador_usuarios_controller'
import TenantMiddleware from '#middleware/tenant_middleware'

// Crear instancias de los controladores
const authCtrl = new ControladorAutenticacion()
const rolesCtrl = new ControladorRoles()
const usuariosCtrl = new ControladorUsuarios()

// Rutas

router.post('/usuarios', usuariosCtrl.crear)

/*
import router from '@adonisjs/core/services/router'
import TenantMiddleware from '#middleware/tenant_middleware'
import MiddlewareAuth from '#middleware/AuthJWT'
import MiddlewareAdmin from '#middleware/MiddlewareAdmin'

import ControladorAutenticacion from '#controllers/controlador_autenticacions_controller'
import ControladorRoles from '#controllers/controlador_roles_controller'
import ControladorUsuarios from '#controllers/controlador_usuarios_controller'

const authCtrl = new ControladorAutenticacion()
const rolesCtrl = new ControladorRoles()
const usuariosCtrl = new ControladorUsuarios()

router.post('/iniciar-sesion', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    return authCtrl.iniciarSesion(ctx)
  })
})

router.post('/roles', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    await new MiddlewareAuth().handle(ctx, async () => {
      await new MiddlewareAdmin().handle(ctx, async () => {
        return rolesCtrl.crear(ctx)
      })
    })
  })
})

router.post('/usuarios', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    return usuariosCtrl.crear(ctx)
  })
})

router.get('/usuarios', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    await new MiddlewareAuth().handle(ctx, async () => {
      await new MiddlewareAdmin().handle(ctx, async () => {
        return usuariosCtrl.listar(ctx)
      })
    })
  })
})

router.put('/usuarios/:id', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    await new MiddlewareAuth().handle(ctx, async () => {
      await new MiddlewareAdmin().handle(ctx, async () => {
        return usuariosCtrl.actualizar(ctx)
      })
    })
  })
})

router.delete('/usuarios/:id', async (ctx) => {
  await new TenantMiddleware().handle(ctx, async () => {
    await new MiddlewareAuth().handle(ctx, async () => {
      await new MiddlewareAdmin().handle(ctx, async () => {
        return usuariosCtrl.eliminar(ctx)
      })
    })
  })
})

*/