# Correr el proyecto

1. Ejecutar `yarn install`
2. Crear archivo `.env` en la raíz del proyecto y colocar los valores de las siguientes variables de entorno:

- `DB_HOST`
- `DB_NAME`
- `SUPERTOKENS_CONNECTION_URI`
- `SUPERTOKENS_API_KEY`
- `NODEMAILER_USER`
- `NODEMAILER_PASSWORD`
- `GOOGLE_APP_CLIENT_ID`
- `GOOGLE_APP_CLIENT_SECRET_KEY`
- `FACEBOOK_APP_ID`
- `FACEBOOK_APP_SECRET_KEY`

3. Ejecutar `yarn run start`

# Configurar pantalla de consentimiento de Google

1. Crear un proyecto en Google Cloud

   1. Ingresar a _API y servicios → API y servicios habilitados_, hacer click en la opción **Habilitar API y Servicios** y habilitar las opciones **Google Analytics Admin API, Google Analytics Data API y People API**
   2. Configurar una pantalla de consentimiento de OAuth
      1. Dirigirse a _Pantalla de consentimiento de OAuth_ y en el campo **User Type** eligir la opción **Externos**
      2. Ingresar un _nombre_ a la aplicación y un **logotipo**
      3. Agregar el permiso `https://www.googleapis.com/auth/analytics.readonly`
      4. Agregar los **usuarios de prueba** que se necesiten
   3. Crear un **ID de cliente OAuth 2.0**
      1. Dirigirse a _Credenciales_, presionar el botón **Crear Credenciales** y hacer click en la opción **ID de cliente de OAuth**
      2. Seleccionar la opción **Aplicación web** en el campo **Tipo de Aplicación**
      3. Colocar los valores `http://localhost` y `http://localhost:3000` en el campo \***\*Orígenes autorizados de JavaScript\*\***

# Configurar pantalla de consentimiento de Facebook

1. Crear una cuenta de desarrollador de Facebook
2. Crear una aplicación **empresarial** de Facebook
   1. Dirigirse a _Configurar → Información básica_ y en el campo **Dominios de la aplicación** colocar como valor `localhost`
   2. Dirigirse a _Configurar → Opciones avanzadas_ y habilitar la opción **Clave secreta de la aplicación obligatoria**
   3. Visitar la sección _Panel_ y agregar los productos **API de marketing** e **Inicio de sesión con Facebook** a la aplicación
   4. Dirigirse a _Inicio de sesión con Facebook → Guía de inicio rápido_ y seguir las instrucciones que especifiquen
      1. En el campo **URL del sitio web** introducir como valor `http://localhost`

# Configurar supertokens

https://supertokens.com/docs/passwordless/custom-ui/init/frontend

# Configurar nodemailer

https://nodemailer.com/about/
