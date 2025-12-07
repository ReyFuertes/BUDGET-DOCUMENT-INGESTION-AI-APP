using System;
using System.Collections.Generic;

namespace BudgetApp.Server.Models
{
    public class Receipt
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string? MerchantName { get; set; }
        public DateTime? StoreDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Currency { get; set; } = "USD";
        public List<ReceiptItem> Items { get; set; } = new List<ReceiptItem>();
        public DateTime? UploadedAt { get; set; } = DateTime.UtcNow;
    }

    public class ReceiptItem
    {
        public string? Description { get; set; }
        public decimal Amount { get; set; }
        public decimal Quantity { get; set; } = 1;
    }
}
