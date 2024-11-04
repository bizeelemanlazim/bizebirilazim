using BBL.Core.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BBL.Entities.Concrete
{
    public class Rating : EntityBase<int>, IEntity, ISoftDelete
    {
        public int ApplyForJobId { get; set; }
        public bool IsEmployer { get; set; }
        public int Rate { get; set; }
        public string Comment { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
