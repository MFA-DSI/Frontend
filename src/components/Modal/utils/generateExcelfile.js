import * as XLSX from "node-xlsx";
import { saveAs } from "file-saver";

export const generateExcelFile = (data) => {
  
  const cleanString = (str) => str.replace(/['"]/g, '').trim();

  const excelData = [
    ["identifiant", "mot de passe"],
    [cleanString(data.identity), cleanString(data.password)],
  ];
  

  
  const buffer = XLSX.build([{ name: "Credentials", data: excelData }]);

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, ` ${data.name}_MFA-ACTION.xlsx`);
};
