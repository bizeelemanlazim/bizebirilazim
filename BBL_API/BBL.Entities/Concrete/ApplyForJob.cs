using BBL.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Entities.Concrete
{
    public class ApplyForJob : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployerId { get; set; }
        public int EmployeeId { get; set; }
        public int AdId { get; set; }
        public bool IsDeleted { get; set; } = false;
        public bool IsApply { get; set; } = false;
        public bool IsFinish { get; set; }
        public Employer Employer { get; set; }
        public Employee Employee { get; set; }
        public Ad Ad { get; set; }
    }
}
