using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class OrderSummary : EntityBase<int>, IEntity
    {
        public int AdId { get; set; }
        public string JobName { get; set; }
        public string OperationTime { get; set; }
        public string? Location { get; set; }
        public decimal ProgressPayment { get; set; }
        public decimal LegalDeduction { get; set; }
        public decimal CommissionFee { get; set; }
        public decimal TotalFees { get; set; }
        public int? EmployeeId { get; set; }

        public Ad Ad { get; set; }
        public Employee Employee { get; set; }
    }
}
