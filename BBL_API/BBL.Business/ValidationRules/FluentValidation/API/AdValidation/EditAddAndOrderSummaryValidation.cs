using BBL.Core.Models.API.Ad;
using FluentValidation;
using System.Globalization;
using System.Text.RegularExpressions;

namespace BBL.Business.ValidationRules.FluentValidation.API.AdValidation
{
    public class EditAddAndOrderSummaryValidation : AbstractValidator<EditAdAndOrderSummary>
    {
        public EditAddAndOrderSummaryValidation()
        {
            #region Ad Validation

            RuleFor(x => x.EditAddModel.Id)
                .ExZoreControl();

            RuleFor(x => x.EditAddModel.JobId)
                .ExZoreControl();

            RuleFor(x => x.EditAddModel.WorkingTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d{2}:\d{2}")
                .WithMessage("hh:mm saat formatında olması gerekiyor");

            //RuleFor(x => x.EditAddModel.WorkStartDate)
            //    .ExDate();

            //RuleFor(x => x.EditAddModel.WorkEndDate)
            //    .ExDate();

            RuleFor(x => x.EditAddModel.WorkingStartTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d{2}:\d{2}")
                .WithMessage("hh:mm saat formatında olması gerekiyor");

            RuleFor(x => x.EditAddModel.IsMyAddress)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.EditAddModel.Price)
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan büyük olmalıdır")
                .Custom((x, context) =>
                {
                    var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                    if (!result)
                        context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
                });

            RuleFor(x => x.EditAddModel.IsMyRecruitment)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.EditAddModel.IsActive)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            #endregion

            #region Order Summary Validation

            RuleFor(x => x.EditOrderSummaryModel.Id)
                .ExZoreControl();

            RuleFor(x => x.EditOrderSummaryModel.JobName)
                .ExNotEmptyAndNotNull();

            RuleFor(x => x.EditOrderSummaryModel.OperationTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d*:\d{2}:\d{2}")
                .WithMessage("d:hh:mm saat formatında olması gerekiyor")
                .Must(x => !x.StartsWith("0"))
                .WithMessage("Gün formatın 0 ile başlamaz");

            RuleFor(x => x.EditOrderSummaryModel.ProgressPayment)
               .GreaterThan(0)
               .WithMessage("Girilen değer 0 dan büyük olmalıdır")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });

            RuleFor(x => x.EditOrderSummaryModel.LegalDeduction)
               .GreaterThan(0)
               .WithMessage("Girilen değer 0 dan büyük olmalıdır")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });

            RuleFor(x => x.EditOrderSummaryModel.CommissionFee)
               .GreaterThan(0)
               .WithMessage("Girilen değer 0 dan büyük olmalıdır")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });

            RuleFor(x => x.EditOrderSummaryModel.TotalFees)
               .GreaterThan(0)
               .WithMessage("Girilen değer 0 dan büyük olmalıdır")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });


            #endregion
        }
    }
}
