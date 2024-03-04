const { google } = require('googleapis');

async function getSheetData(authClient, spreadsheetId, range) {
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    const response = await sheets.spreadsheets.values.get({ spreadsheetId, range });
    return response.data.values;
}

module.exports = {
    getSheetData
};
