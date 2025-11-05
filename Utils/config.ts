import * as path from 'path';
import * as XLSX from 'xlsx';
export const config = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  username: process.env.USERNAME || 'standard_user',
  password: process.env.PASSWORD || 'secret_sauce',
  excelFilePath: 'C:/Users/rajes/OneDrive/Desktop/saucedemo-playwright/testData/Credentials.xlsx',
};
