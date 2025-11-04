import * as path from 'path';  // Node.js built-in module
import * as XLSX from 'xlsx';

// Use absolute path or normalize it with path module
export const excelFilePath = path.resolve('C:/Users/rajes/OneDrive/Desktop/saucedemo-playwright/testData/Credentials.xlsx');

export function readExcelSheet(filePath: string, sheetName: string) {
  const workbook = XLSX.readFile(filePath);
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
}
