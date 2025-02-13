import React from "react";
import { serverAddress } from "../../envdata";

const CsvExport = ({ api, filename = "export.csv" }) => {
  const flattenObject = (obj, prefix = "") => {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (Array.isArray(obj[key])) {
        acc[newKey] = obj[key].map((item) => JSON.stringify(item)).join("; ");
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], newKey));
      } else {
        acc[newKey] = obj[key];
      }
      return acc;
    }, {});
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const flatData = data.map((row) => flattenObject(row));
    const headers = Object.keys(flatData[0]).join(",");
    const rows = flatData.map((row) =>
      Object.values(row)
        .map((value) => `"${String(value).replace(/"/g, '""')}"`)
        .join(",")
    );

    return [headers, ...rows].join("\n");
  };

  const downloadCSV = async () => {
    const response = await fetch(api);

    const data = await response.json();

    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn btn-info" onClick={downloadCSV}>
      Export CSV
    </button>
  );
};

export default CsvExport;
