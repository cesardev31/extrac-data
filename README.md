# Servidor Node.js con Google Sheets y MongoDB

Este proyecto configura un servidor Node.js que se conecta a la API de Google Sheets para extraer información de clientes potenciales, la guarda en MongoDB y luego utiliza Express para montar un servidor que muestra gráficas del análisis de los clientes potenciales recibidos por día y por mes.

## Pre-requisitos

Antes de iniciar, asegúrate de tener instalado Node.js y MongoDB en tu sistema. También necesitarás una cuenta de Google Cloud con un proyecto configurado para acceder a la API de Google Sheets.

## Configuración

1. Clona el repositorio a tu sistema local.

2. Instala las dependencias necesarias ejecutando:

    con pnpm
    ```bash
    pnpm install
    ```
    o puedes usar npm

    ```bash
    npm install
    ```

3. Configura tus credenciales de Google Cloud:

    - Ve a la [Consola de Google Cloud](https://console.cloud.google.com/), crea un nuevo proyecto o selecciona uno existente.
    - Habilita la API de Google Sheets para tu proyecto.
    - Ve a "Credenciales", crea credenciales de tipo "ID de cliente de OAuth" y descarga el archivo `credentials.json`.

4. Coloca el archivo `credentials.json` en la raíz del proyecto.

5. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

    ```env
    MONGODB_URI=tu_uri_de_mongodb
    GOOGLE_SHEETS_ID=tu_id_de_google_sheets
    RANGESHEETS=tu_rango_de_datos_en_sheets
    ```

    Reemplaza `tu_uri_de_mongodb`, `tu_id_de_google_sheets`, y `tu_rango_de_datos_en_sheets` con tus propios valores.

## Uso

Para extraer los datos de Google Sheets y guardarlos en MongoDB, así como para iniciar el servidor Express, sigue estos pasos:

1. Ejecuta el archivo `index.js` para extraer los datos:

    ```bash
    node index.js
    ```

2. Para iniciar el servidor Express y acceder a las gráficas de análisis, ejecuta:

    ```bash
    node app.js
    ```

    Esto también ejecutará `index.js` automáticamente para asegurar que los datos más recientes sean extraídos y almacenados en MongoDB antes de mostrar las gráficas.

## Acceso a las Gráficas

Una vez que el servidor Express esté corriendo, puedes acceder a las gráficas de análisis navegando a `http://localhost:puerto`, donde `puerto` es el puerto en el que tu servidor Express está configurado para escuchar.

## Notas Adicionales

- Asegúrate de tener las dependencias correctas en tu archivo `package.json`, incluyendo `express`, `mongoose`, `dotenv`, y cualquier otra librería necesaria para interactuar con Google Sheets y MongoDB.
- La configuración de seguridad en MongoDB y Google Cloud es crucial. Asegúrate de configurar las reglas de acceso y permisos adecuadamente para proteger tus datos.
