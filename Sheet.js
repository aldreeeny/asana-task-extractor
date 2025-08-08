const writeToSpreadsheet = (sheetData) => {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SHEET_NAME");
  sheet.getRange("A2:G").clearContent();
  sheet.getRange(2, 1, sheetData.length, sheetData[0].length).setValues(sheetData);
}