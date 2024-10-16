import * as XLSX from 'node-xlsx';
import { saveAs } from 'file-saver';


export const generateExcelFile = (data) => {
    // Create an Excel worksheet with the credentials
    const excelData = [
      ['ID', 'Email', 'Password'],
      [data.id, data.identity, data.password],
    ];

    // Create the worksheet buffer
    const buffer = XLSX.build([{ name: 'Credentials', data: excelData }]);

    // Save the file using FileSaver
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'responsible_credentials.xlsx');
  };