const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const CREDENTIALS_PATH = "./credentials/credentials.json";
const TOKEN_PATH = "./credentials/token.json";

function getOAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const { client_secret, client_id, redirect_uris } = credentials.web;
  return new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
}

function authenticate(scopes) {
  const oAuth2Client = getOAuthClient();
  return new Promise((resolve, reject) => {
    // Revisar si ya tenemos un token almacenado
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) {
        // Si no hay token, obtener uno nuevo
        getAccessToken(oAuth2Client, scopes, resolve, reject);
      } else {
        // Si ya existe token, usar ese
        oAuth2Client.setCredentials(JSON.parse(token));
        resolve(oAuth2Client);
      }
    });
  });
}

function getAccessToken(oAuth2Client, scopes, resolve, reject) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });

  console.log("Autoriza esta aplicación visitando esta URL:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Introduce el código de esa página aquí: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        console.error("Error al recuperar el token de acceso", err);
        return reject(err);
      }
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log("Token almacenado en", TOKEN_PATH);
      oAuth2Client.setCredentials(token);
      resolve(oAuth2Client);
    });
  });
}

module.exports = {
  getOAuthClient,
  authenticate,
};
