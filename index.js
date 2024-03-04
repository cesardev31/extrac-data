const { authenticate } = require("./google-auth");
const { insertData } = require("./mongodb-handler");
const { getSheetData } = require("./sheets-handler");
require("dotenv").config();

const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
const range = process.env.RANGESHEETS; // Asegúrate de ajustar el rango según tus necesidades
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

function initAuthProcess() {
  getNewToken(); // Solo se llama si no tienes un token.json
}

async function main() {
  try {
    const authClient = await authenticate(SCOPES);
    const rows = await getSheetData(authClient, spreadsheetId, range);
    if (rows.length) {
      // Transforma los datos si es necesario antes de insertarlos
      const documents = rows.map((row) => ({
        fechaHora: row[0],
        pt: row[1],
        nombre: row[2],
        correo: row[3],
        telefono: row[4],
        campana: row[5],
        asesoria: row[6],
        tipoEmpresa: row[7],
        metaVentas: row[8],
      }));
      await insertData("sheets", documents);
    } else {
      console.log("No se encontraron datos.");
    }
  } catch (error) {
    console.error("Error al ejecutar el script principal:", error);
  }
}

main();
