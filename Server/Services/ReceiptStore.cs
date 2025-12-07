using System;
using System.Collections.Generic;
using BudgetApp.Server.Models;

namespace BudgetApp.Server.Services
{
    public class ReceiptStore
    {
        private readonly List<Receipt> _receipts = new List<Receipt>();

        public void Add(Receipt receipt)
        {
            _receipts.Add(receipt);
        }

        public List<Receipt> GetAll()
        {
            return _receipts;
        }

        public void Clear()
        {
            _receipts.Clear();
        }
    }
}
