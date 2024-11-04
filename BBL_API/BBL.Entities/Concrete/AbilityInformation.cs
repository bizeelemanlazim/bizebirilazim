using BBL.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Entities.Concrete
{
    public class AbilityInformation : EntityBase<int>, IEntity, ISoftDelete
    {
        public int EmployeeId { get; set; }
        public int AbilityId { get; set; }
        public string Description { get; set; }
        public int Degree { get; set; }
        public bool IsDeleted { get; set; }

        public Employee Employee { get; set; }
    }
}