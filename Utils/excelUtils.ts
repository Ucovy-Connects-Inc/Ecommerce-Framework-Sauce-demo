import * as XLSX from 'xlsx';
import * as path from 'path';

export function readExcelSheet<T>(filePath: string, sheetName: string): T[] {
  const fullPath = path.resolve(filePath);
  const workbook = XLSX.readFile(fullPath);
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) throw new Error(`Sheet ${sheetName} not found in ${filePath}`);

  const data = XLSX.utils.sheet_to_json(sheet, { defval: '' });
  return data as T[];
}
