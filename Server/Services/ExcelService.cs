using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using BudgetApp.Server.Models;
using ClosedXML.Excel;

namespace BudgetApp.Server.Services
{
    public interface IExcelService
    {
        byte[] GenerateReport(List<Receipt> receipts);
    }

    public class ExcelService : IExcelService
    {
        public byte[] GenerateReport(List<Receipt> receipts)
        {
            using var workbook = new XLWorkbook();

            // 1. Raw Data Sheet
            var rawSheet = workbook.Worksheets.Add("Raw Data");
            rawSheet.Cell(1, 1).Value = "Date";
            rawSheet.Cell(1, 2).Value = "Merchant";
            rawSheet.Cell(1, 3).Value = "Total";
            rawSheet.Cell(1, 4).Value = "Items";
            rawSheet.Cell(1, 5).Value = "Uploaded At";
            
            var header = rawSheet.Range(1, 1, 1, 5);
            header.Style.Font.Bold = true;
            header.Style.Fill.BackgroundColor = XLColor.LightGray;

            int row = 2;
            foreach (var r in receipts.OrderByDescending(x => x.StoreDate))
            {
                rawSheet.Cell(row, 1).Value = r.StoreDate?.ToShortDateString();
                rawSheet.Cell(row, 2).Value = r.MerchantName;
                rawSheet.Cell(row, 3).Value = r.TotalAmount;
                rawSheet.Cell(row, 3).Style.NumberFormat.Format = "$ #,##0.00";
                
                var itemsStr = r.Items != null ? string.Join(", ", r.Items.Select(i => $"{i.Description} (${i.Amount})")) : "";
                rawSheet.Cell(row, 4).Value = itemsStr;
                rawSheet.Cell(row, 5).Value = r.UploadedAt?.ToString();
                row++;
            }
            rawSheet.Columns().AdjustToContents();

            // 2. Weekly Summary
            var weeklySheet = workbook.Worksheets.Add("Weekly Summary");
            weeklySheet.Cell(1, 1).Value = "Week";
            weeklySheet.Cell(1, 2).Value = "Total Spent";
            weeklySheet.Cell(1, 3).Value = "Count";
            weeklySheet.Range(1, 1, 1, 3).Style.Font.Bold = true;

            var weeklyGroups = receipts
                .Where(r => r.StoreDate.HasValue)
                .GroupBy(r => System.Globalization.ISOWeek.GetWeekOfYear(r.StoreDate.Value))
                .OrderBy(g => g.Key);

            row = 2;
            foreach (var group in weeklyGroups)
            {
                weeklySheet.Cell(row, 1).Value = $"Week {group.Key}";
                weeklySheet.Cell(row, 2).Value = group.Sum(x => x.TotalAmount);
                weeklySheet.Cell(row, 2).Style.NumberFormat.Format = "$ #,##0.00";
                weeklySheet.Cell(row, 3).Value = group.Count();
                row++;
            }
            weeklySheet.Columns().AdjustToContents();

            // 3. Monthly Summary
            var monthlySheet = workbook.Worksheets.Add("Monthly Summary");
            monthlySheet.Cell(1, 1).Value = "Month";
            monthlySheet.Cell(1, 2).Value = "Total Spent";
            monthlySheet.Cell(1, 3).Value = "Count";
            monthlySheet.Range(1, 1, 1, 3).Style.Font.Bold = true;

            var monthlyGroups = receipts
                .Where(r => r.StoreDate.HasValue)
                .GroupBy(r => new { r.StoreDate.Value.Year, r.StoreDate.Value.Month })
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month);

            row = 2;
            foreach (var group in monthlyGroups)
            {
                var monthName = new DateTime(group.Key.Year, group.Key.Month, 1).ToString("MMMM yyyy");
                monthlySheet.Cell(row, 1).Value = monthName;
                monthlySheet.Cell(row, 2).Value = group.Sum(x => x.TotalAmount);
                monthlySheet.Cell(row, 2).Style.NumberFormat.Format = "$ #,##0.00";
                monthlySheet.Cell(row, 3).Value = group.Count();
                row++;
            }
            monthlySheet.Columns().AdjustToContents();

            using var stream = new MemoryStream();
            workbook.SaveAs(stream);
            return stream.ToArray();
        }
    }
}
