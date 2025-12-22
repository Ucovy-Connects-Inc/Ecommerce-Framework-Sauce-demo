// utils/excelDataProviders.ts
import path from 'path';
import { readExcelSheet } from './excelUtils';
import { test } from '@playwright/test';

export type ExcelRow = Record<string, string>;

const EXCEL_FILE_PATH =
    process.env.EXCEL_FILE_PATH || 'testData/Credentials.xlsx';
const SHEET_NAME = 'Sheet1';

function loadAllRows(): ExcelRow[] {
    const rows = readExcelSheet<ExcelRow>(EXCEL_FILE_PATH, SHEET_NAME);
    if (!rows.length) {
        throw new Error(`Excel sheet ${SHEET_NAME} is empty`);
    }
    return rows;
}

export function getLoginUserForSpec(specFile: string): ExcelRow {
    const specName = path.basename(specFile);
    const rows = loadAllRows();

    const match = rows.find(
        r => r.TestData?.trim() === specName
    );

    if (!match) {
        test.skip(true, `No Excel data for spec: ${specName}`);
    }

    return match!;
}

export function getCheckoutInfoFirstRow(): ExcelRow {
    const rows = loadAllRows();
    return rows[0];
}
