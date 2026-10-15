# Frontend Web 1.1 — infraestructura HTTP y health

## Arquitectura

El cliente web se comunica exclusivamente con `SistemaVentasMotorrepuestos.API` mediante HTTPS y JSON. No contiene cadenas de conexión, credenciales SQL, secretos ni reglas de negocio. Los módulos funcionales continúan usando datos de demostración; en esta fase solo `/health` y `/health/ready` consumen la API real.

## Configuración

`VITE_API_BASE_URL` define el origen de la API. `.env.example` usa `https://localhost:7249`, el perfil HTTPS oficial de desarrollo. En desarrollo existe el mismo valor predeterminado; en producción la variable es obligatoria. Las URL se validan y solo aceptan HTTP o HTTPS.

Vite escucha en `http://localhost:5173` para coincidir con el origen ya autorizado por CORS. No se modificó CORS en el backend.

## Cliente HTTP y errores

`src/api/httpClient.ts` centraliza URL base, métodos, JSON, headers, timeout de 10 segundos, `AbortSignal`, cancelación, respuestas vacías y errores no exitosos. Permite añadir `Authorization` posteriormente mediante headers, pero Web 1.1 no implementa JWT.

Los errores se normalizan como `ApiError`, conservando estado HTTP y `traceId`. Se reconocen `{ status, message, traceId }`, `{ mensaje }` y la validación ASP.NET con `title`, `status`, `errors` y `traceId`. No se exponen stack traces.

## Estado de la API

El encabezado consulta una vez `/health` y después `/health/ready`. Presenta comprobando, disponible, no preparada o sin conexión. Si falla ofrece reintento manual; no realiza polling.

## Seguridad y límites

No se añadieron tokens, contraseñas reales, acceso SQL ni desactivación TLS. El login y los módulos de negocio siguen siendo demostrativos. La siguiente fase deberá cerrar el contrato de tenant, `IdEmpresa`, permisos y JWT antes de conectar autenticación o endpoints empresariales.
