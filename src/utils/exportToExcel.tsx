import FileSaver from "file-saver";
import { createLogger } from "vite";
import XLSX from "xlsx";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToExcel = (apiData: any, fileName: string) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  console.log(ws);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  // FileSaver.saveAs(data, fileName + fileExtension);
};
