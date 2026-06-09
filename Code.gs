/**
 * Future Focus – Student Registration
 * Google Apps Script Web App
 *
 * SETUP (one-time, ~5 minutes):
 * 1. Open https://sheets.google.com and create a new spreadsheet.
 *    Name the first sheet "Registrations".
 * 2. In the spreadsheet, click Extensions → Apps Script.
 * 3. Delete any existing code and paste ALL of this file.
 * 4. Click Deploy → New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy, then Authorize access when prompted.
 * 6. Copy the Web App URL (looks like:
 *    https://script.google.com/macros/s/AKfy.../exec)
 * 7. In index.html, paste that URL as the value of SHEET_URL.
 * 8. Commit and push index.html to GitHub.
 *
 * ADMIN PANEL:
 * Open your site with ?admin=orbit2025 appended, e.g.:
 *   https://mokamiAI.github.io/Orbit-College/?admin=orbit2025
 * Click "Refresh from Sheets" to load all registrations live.
 * Click "Download CSV" to export to Excel-compatible CSV.
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Registrations');
    if (!sheet) sheet = ss.insertSheet('Registrations');

    // Write header row on first use
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['#', 'Student Number', 'Surname & Initial', 'Program', 'Group', 'Registered At']);
      const hdr = sheet.getRange(1, 1, 1, 6);
      hdr.setFontWeight('bold').setBackground('#0a2463').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      sheet.setColumnWidths(1, 6, 150);
      sheet.setColumnWidth(1, 50);
      sheet.setColumnWidth(2, 120);
      sheet.setColumnWidth(4, 260);
    }

    const data  = JSON.parse(e.postData.contents);
    const regNo = sheet.getLastRow(); // row 1 = header, so row 2 = reg #1

    sheet.appendRow([regNo, data.studentNo, data.surname, data.program, data.group, data.at]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', reg: regNo }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Registrations');

    if (!sheet || sheet.getLastRow() <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: 'ok', count: 0, data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues();
    const data   = values.map(r => ({
      num:       r[0],
      studentNo: r[1],
      surname:   r[2],
      program:   r[3],
      group:     r[4],
      at:        r[5]
    }));

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok', count: data.length, data: data }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', count: 0, data: [] }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
