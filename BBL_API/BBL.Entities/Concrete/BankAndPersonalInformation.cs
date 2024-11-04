using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class BankAndPersonalInformation : EntityBase<int>, IEntity
    {
        public int EmployeeId { get; set; }
        public string BankName { get; set; }
        public string BranchName { get; set; }
        public string BranchCode { get; set; }
        public string AccountName { get; set; }
        public string IBAN { get; set; }
        public string TCIdentityNumber { get; set; }
        public string TCSerialNumber { get; set; }

        public DateTime ExpiryDate { get; set; }
        public string FatherName { get; set; }
        public string MotherName { get; set; }
        public string IssuingAuthority { get; set; }
        public string SettlementBarcodeNumber { get; set; }
        public string CriminalRecordBarcodeNumber { get; set; }

        public Employee Employee { get; set; }
    }
}