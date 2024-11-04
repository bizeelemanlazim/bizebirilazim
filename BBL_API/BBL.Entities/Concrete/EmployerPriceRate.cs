using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class EmployerPriceRate : EntityBase<int>, IEntity
    {
        public int EmployerId { get; set; }
        public decimal LegalDeduction { get; set; }
        public double CommissionFee { get; set; }

        public Employer Employer { get; set; }
    }
}