import * as path from 'path';
import * as XLSX from 'xlsx';

export function readExcelSheet(filePath: string, sheetName: string) {
  const workbook = XLSX.readFile(filePath);
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
}
