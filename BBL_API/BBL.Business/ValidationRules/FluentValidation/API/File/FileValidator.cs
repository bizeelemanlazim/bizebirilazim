using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace BBL.Business.ValidationRules.FluentValidation.API.File
{
    public class FileValidator : AbstractValidator<IFormFile>
    {
        public FileValidator()
        {
            RuleFor(x => x.Length)
                .NotNull()
                .LessThanOrEqualTo(100)
                .WithMessage("Dosya boyutu izin verilenden daha büyük (100)");

            RuleFor(x => x.ContentType)
                .NotNull()
                .Must(x => x.Equals("image/jpeg") || x.Equals("image/jpg") || x.Equals("image/png"))
                .WithMessage("Dosya türü izin verilenden farklı. (.jpeg .jpg .png)");
        }
    }
}
