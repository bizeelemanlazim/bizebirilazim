using BBL.Entities.Concrete;
using Microsoft.AspNetCore.Identity;

namespace BBL.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            this.Employers = new HashSet<Employer>();
            this.Employees = new HashSet<Employee>();
        }

        public string RefreshToken { get; set; } = null!;
        public bool IsDeleted { get; set; }

        public ICollection<Employer> Employers { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}