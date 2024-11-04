using BBL.Core.Models.API.Ad;
using FluentValidation;
using System.Globalization;
using System.Text.RegularExpressions;

namespace BBL.Business.ValidationRules.FluentValidation.API.AdValidation
{
    public class InsertAdAndOrderSummaryValidation : AbstractValidator<InsertAdAndOrderSummary>
    {
        public InsertAdAndOrderSummaryValidation()
        {
            #region Ad Validation

            RuleFor(x => x.InsertAddModel.JobId)
                .ExZoreControl();

            RuleFor(x => x.InsertAddModel.WorkingTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d{2}:\d{2}")
                .WithMessage("hh:mm saat formatında olması gerekiyor");

            //RuleFor(x => x.InsertAddModel.WorkStartDate)
            //    .ExDate();

            //RuleFor(x => x.InsertAddModel.WorkEndDate)
            //    .ExDate();

            RuleFor(x => x.InsertAddModel.WorkingStartTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d{2}:\d{2}")
                .WithMessage("hh:mm saat formatında olması gerekiyor");

            RuleFor(x => x.InsertAddModel.IsMyAddress)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            RuleFor(x => x.InsertAddModel.Price)
                .NotNull()
                .WithMessage("Bu alan boş olamaz")
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan farklı veya 0 dan büyük olması gerekiyor.")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });

            RuleFor(x => x.InsertAddModel.IsMyRecruitment)
                .Must(x => x == false || x == true)
                .WithMessage("Lütfen geçerli bir değer girin");

            When(x => x.InsertAddModel.IsMyAddress == false, () =>
            {
                RuleFor(x => x.InsertAddModel.Address)
                    .ExNotEmptyAndNotNull();
            });

            #endregion

            #region Order Summary Validation

            RuleFor(x => x.InsertOrderSummaryModel.JobName)
                .ExNotEmptyAndNotNull();

            RuleFor(x => x.InsertOrderSummaryModel.OperationTime)
                .ExNotEmptyAndNotNull()
                .Matches(@"\d*:\d{2}:\d{2}")
                .WithMessage("d:hh:mm saat formatında olması gerekiyor")
                .Must(x => !x.StartsWith("0"))
                .WithMessage("Gün formatın 0 ile başlamaz");

            RuleFor(x => x.InsertOrderSummaryModel.ProgressPayment)
                .NotNull()
                .WithMessage("Bu alan boş olamaz")
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan farklı veya 0 dan büyük olması gerekiyor.")
                .Custom((x, context) =>
                {
                    var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                    if (!result)
                        context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
                });

            RuleFor(x => x.InsertOrderSummaryModel.LegalDeduction)
               .NotNull()
                .WithMessage("Bu alan boş olamaz")
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan farklı veya 0 dan büyük olması gerekiyor.")
                .Custom((x, context) =>
                {
                    var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                    if (!result)
                        context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
                });

            RuleFor(x => x.InsertOrderSummaryModel.CommissionFee)
               .NotNull()
                .WithMessage("Bu alan boş olamaz")
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan farklı veya 0 dan büyük olması gerekiyor.")
                .Custom((x, context) =>
                {
                    var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                    if (!result)
                        context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
                });

            RuleFor(x => x.InsertOrderSummaryModel.TotalFees)
               .NotNull()
                .WithMessage("Bu alan boş olamaz")
                .GreaterThan(0)
                .WithMessage("Girilen değer 0 dan farklı veya 0 dan büyük olması gerekiyor.")
               .Custom((x, context) =>
               {
                   var result = Regex.IsMatch(x.ToString("0.##", CultureInfo.InvariantCulture), @"^\d+(\.\d{1,2})?$");

                   if (!result)
                       context.AddFailure(context.DisplayName, "Lütfen (18,2) formatında yazınız");
               });

            When(x => x.InsertAddModel.IsMyAddress == false, () =>
            {
                RuleFor(x => x.InsertOrderSummaryModel.Location)
                    .ExNotEmptyAndNotNull();
            });

            #endregion
        }
    }
}
