using BBL.Core.Models.API.Employer;
using FluentValidation;

namespace BBL.Business.ValidationRules.FluentValidation.API.EmployerValidation
{
    public class UpdateEmployerUserValidator : AbstractValidator<EditEmployerUserModel>
    {
        public UpdateEmployerUserValidator()
        {
            RuleFor(x => x.FirstName).ExNotEmptyAndNotNull();

            RuleFor(x => x.LastName).ExNotEmptyAndNotNull();

            RuleFor(x => x.CommercialTitle).ExNotEmptyAndNotNull();

            RuleFor(x => x.Email).ExEmail();

            RuleFor(x => x.PhoneNumber).ExPhone();

            RuleFor(x => x.TaxNumber)
                 .ExNotEmptyAndNotNull()
                 .MaximumLength(10)
                 .MinimumLength(10)
                 .WithMessage("Lütfen 10 karakter olacak şekilde giriniz.")
                 .Custom((x, context) =>
                 {
                     if (x.ToCharArray().Where(y => !Char.IsNumber(y)).Count() > 0)
                         context.AddFailure(context.DisplayName, "Lütfen sadece sayısal değer giriniz");
                 });

            RuleFor(x => x.TaxOffice).ExNotEmptyAndNotNull();

            RuleFor(x => x.RecordNumber)
                 .ExNotEmptyAndNotNull()
                 .MaximumLength(16)
                 .MinimumLength(16)
                 .WithMessage("Lütfen 16 karakter olacak şekilde giriniz.")
                 .Custom((x, context) =>
                 {
                     if (x.ToCharArray().Where(y => !Char.IsNumber(y)).Count() > 0)
                         context.AddFailure(context.DisplayName, "Lütfen sadece sayısal değer giriniz");
                 });

            RuleFor(x => x.MersisNumber)
                 .ExNotEmptyAndNotNull()
                 .MaximumLength(16)
                 .MinimumLength(16)
                 .WithMessage("Lütfen 16 karakter olacak şekilde giriniz.")
                 .Custom((x, context) =>
                 {
                     if (x.ToCharArray().Where(y => !Char.IsNumber(y)).Count() > 0)
                         context.AddFailure(context.DisplayName, "Lütfen sadece sayısal değer giriniz");
                 });

            RuleFor(x => x.Address).ExNotEmptyAndNotNull();

            When(x => !String.IsNullOrEmpty(x.FoundedDate), () =>
            {
                RuleFor(x => x.FoundedDate).ExDateYear();
            });
        }
    }
}