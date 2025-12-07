using System;

namespace BudgetApp.Server.Models
{
    public class ExpenseSummary
    {
        public string Period { get; set; } = string.Empty; // "Week 42" or "October"
        public decimal TotalAmount { get; set; }
        public int ReceiptCount { get; set; }
    }
}
