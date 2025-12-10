// utils/excelDataProviders.ts
import path from 'path';
import { readExcelSheet } from './excelUtils';

export type ExcelRow = Record<string, unknown>;

const EXCEL_FILE_PATH = process.env.EXCEL_FILE_PATH || 'testData/Credentials.xlsx';
const SHEET_NAME = 'Sheet1';

function loadAllRows(): ExcelRow[] {
    return readExcelSheet<ExcelRow>(EXCEL_FILE_PATH, SHEET_NAME);
}

// Row whose TestData matches spec file name → login user
export function getLoginUserForSpec(specPath: string): ExcelRow {
    const specName = path.basename(specPath);
    const rows = loadAllRows();

    const match = rows.find(r => String(r['TestData'] ?? '').trim() === specName);
    if (!match) {
        throw new Error(`No TestData row found for ${specName}`);
    }
    return match;
}

// First data row → checkout info
export function getCheckoutInfoFirstRow(): ExcelRow {
    const rows = loadAllRows();
    const first = rows[0];
    if (!first) {
        throw new Error('No data rows found in Excel');
    }
    return first;
}
