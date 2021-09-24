// @ts-nocheck
import FileSaver from "file-saver";
import { createLogger } from "vite";
import XLSX from "xlsx";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const handleExportExcel = (rawData: any, fileName: any) => {
  const ws = XLSX.utils.json_to_sheet(rawData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAsExcel(excelBuffer, fileName);
};

const saveAsExcel = (buffer: any, filename: any) => {
  const data = new Blob([buffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
};
