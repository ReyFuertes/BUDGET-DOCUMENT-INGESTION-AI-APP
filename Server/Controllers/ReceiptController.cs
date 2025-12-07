using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using BudgetApp.Server.Models;
using BudgetApp.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BudgetApp.Server.Controllers
{
    [ApiController]
    [Route("api/receipts")]
    public class ReceiptController : ControllerBase
    {
        private readonly IAiExtractionService _aiService;
        private readonly IExcelService _excelService;
        private readonly ReceiptStore _store;

        public ReceiptController(IAiExtractionService aiService, IExcelService excelService, ReceiptStore store)
        {
            _aiService = aiService;
            _excelService = excelService;
            _store = store;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var ms = new MemoryStream();
            await file.CopyToAsync(ms);
            var base64 = Convert.ToBase64String(ms.ToArray());

            var receipt = await _aiService.ExtractDataAsync(base64);
            _store.Add(receipt);

            return Ok(receipt);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_store.GetAll());
        }

        [HttpGet("export")]
        public IActionResult Export()
        {
            var receipts = _store.GetAll();
            if (receipts.Count == 0)
                return BadRequest("No receipts to export.");

            var fileContent = _excelService.GenerateReport(receipts);
            return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"BudgetReport_{DateTime.Now:yyyyMMdd}.xlsx");
        }
    }
}
