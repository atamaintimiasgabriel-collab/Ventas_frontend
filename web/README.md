# Sistema Integral Motorrepuestos — demo web

Demo con React, TypeScript, Vite, React Router, Lucide y CSS Modules. La infraestructura Web 1.1 consume de forma real únicamente `/health` y `/health/ready`; los módulos de negocio y el login continúan siendo demostrativos.

## Ejecutar en Windows

Desde `frontend/web/`:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir la dirección que informa Vite (configurada en `http://localhost:5173` para coincidir con CORS de la API). Usar `npm.cmd` si PowerShell bloquea `npm.ps1`; no es necesario modificar su política. La URL de API puede configurarse con `VITE_API_BASE_URL`; consultar `.env.example`.

```powershell
npm.cmd run build
npm.cmd run lint
npm.cmd test
```

## Acceso de presentación

- Usuario: `administrador.demo`
- Contraseña: `Demo2026!`
- Los campos vienen preparados. Son valores públicos y ficticios.
- Sesión solo en memoria. Recargar o cerrar sesión requiere entrar nuevamente.
- Recordar acceso es una opción visual explicada, no almacena credenciales.
- Google, Facebook, recuperación y registro abren información de funciones futuras; no envían datos.

## Recorrido

Login → Dashboard → Productos → Inventario → Pedidos → Ventas/POS.

Productos permite buscar, filtrar, paginar y ver detalles. Inventario comparte existencias con el catálogo. Pedidos usa estados compatibles con el backend y explica Web/App → Pedido → API → Desktop/POS → Venta. POS permite llenar un carrito y simular el cierre sin guardar una venta ni afectar stock. Los importes e impuestos son ilustrativos.

## Organización

- `routes`: navegación y entrada local de demostración.
- `layouts`: estructura común de la aplicación.
- `components`: elementos compartidos y piezas de POS.
- `pages`: composición de cada pantalla.
- `api`: cliente HTTP central y tipos de transporte.
- `services`: adaptador demo y servicio real de health.
- `contexts`: sesión demo temporal.
- `config`: navegación e identidad demo.
- `mocks`: fixtures y aritmética ilustrativa POS, separados de las páginas.
- `types`: modelos TypeScript de demostración.
- `styles`: variables y estilos globales; CSS Modules junto a sus componentes.

La ilustración mecánica del login es SVG local. No se descargan imágenes ni fuentes remotas. Las animaciones CSS respetan `prefers-reduced-motion`.

## Límites de integración

No hay autenticación productiva, persistencia, recuperación real, OAuth ni CRUD real. La selección de sucursal es solo contexto demo. Los indicadores representan fixtures, no SQL. Las transferencias son registros visuales y los módulos futuros no tienen rutas falsas. El POS operativo corresponde al cliente Desktop.

La futura integración requiere revisar tenant/JWT, permisos, endpoints disponibles y arranque seguro del backend. No sustituir automáticamente errores de API por mocks. No conectar el botón POS web a creación real de ventas.
