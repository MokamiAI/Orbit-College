/**
 * Future Focus – Student Registration
 * Google Apps Script Web App
 *
 * SETUP (one-time, ~3 minutes):
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1rtjrubybIBMrkdu98PKdUZYVfsMA6asRQWlSZD0P_h0
 * 2. Click Extensions → Apps Script
 * 3. Delete any existing code and paste ALL of this file
 * 4. Click Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy and authorize when prompted
 * 6. Copy the Web App URL (https://script.google.com/macros/s/.../exec)
 * 7. Send that URL — it will be pasted into index.html as SHEET_URL
 *
 * ADMIN PANEL (after SHEET_URL is set):
 *   https://mokamiai.github.io/Orbit-College/?admin=orbit2025
 */

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Registrations');
    if (!sheet) sheet = ss.insertSheet('Registrations');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['#', 'Student Number', 'Surname & Initial', 'Program', 'Registered At']);
      const hdr = sheet.getRange(1, 1, 1, 5);
      hdr.setFontWeight('bold').setBackground('#0a2463').setFontColor('#ffffff');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 50);
      sheet.setColumnWidth(2, 130);
      sheet.setColumnWidth(3, 160);
      sheet.setColumnWidth(4, 280);
      sheet.setColumnWidth(5, 170);
    }

    const data  = JSON.parse(e.postData.contents);
    const regNo = sheet.getLastRow();

    sheet.appendRow([regNo, data.studentNo, data.surname, data.program, data.at]);

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

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
    const data   = values.map(r => ({
      num:       r[0],
      studentNo: r[1],
      surname:   r[2],
      program:   r[3],
      at:        r[4]
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
