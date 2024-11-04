using BBL.Core.Domain.Entities;

namespace BBL.Entities.Concrete
{
    public class DisabledStatus : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public int CategoryId { get; set; }
        public int Percentage { get; set; }
        public bool IsHealthReport { get; set; }
        public bool IsChronicHealth { get; set; }
        public string ChronicDescription { get; set; }
        public bool IsContinuousMedicationUse { get; set; }
        public string ContinuousMedicationUseDescription { get; set; }
        public bool IsLossOfConsciousness { get; set; }
        public string LossOfConsciousnessDescription { get; set; }
        public bool IsInfectiousDisease { get; set; }
        public string InfectiousDiseaseDescription { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}