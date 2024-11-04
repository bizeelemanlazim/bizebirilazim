using BBL;

namespace FluentValidation
{
    public static class ValidationExtensions
    {
        public static IRuleBuilder<T, int> ExZoreControl<T>(this IRuleBuilder<T, int> ruleBuilder)
        {
            var options = ruleBuilder
                .NotNull().WithMessage(ResultMessages.IsNullAndIsEmpty)
                .GreaterThan(0).WithMessage(ResultMessages.IsZeroControl);

            return options;
        }

        public static IRuleBuilder<T, string> ExNotEmptyAndNotNull<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .NotNull()
                .WithMessage(ResultMessages.IsNullAndIsEmpty);

            return options;
        }

        public static IRuleBuilder<T, string> ExPassword<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .ExNotEmptyAndNotNull()
                .MinimumLength(8).WithMessage(ResultMessages.PasswordIsMinimumLength)
                .MaximumLength(16).WithMessage(ResultMessages.PasswordIsMaximumLength)
                // .Matches(@"[a-z]").WithMessage(ResultMessages.PasswordIsValidLowerChacter)
                //.Matches(@"[A-Z]").WithMessage(ResultMessages.PasswordIsValidUpperChacter)
                .Matches(@"[0-9]").WithMessage(ResultMessages.PasswordIsValidDigitChacter)
               // .Matches(@"[!@#$%^&*\(\)_\+\-\={}<>,\.\|""'~`:;\\?\/\[\] ]").WithMessage(ResultMessages.PasswordIsValidSymbolChacter)
                .Matches(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\p{P}\p{S}]).{8,16}$").WithMessage(ResultMessages.PasswordIsValidPassword);

            return options;
        }

        public static IRuleBuilder<T, string> ExPhone<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty().NotNull().WithMessage(ResultMessages.IsNullAndIsEmpty)
                .MaximumLength(10).MinimumLength(10).WithMessage(ResultMessages.PhoneNumberLength)
                .Custom((x, context) =>
                {
                    if (x.ToCharArray().Where(y => !Char.IsNumber(y)).Count() > 0)
                        context.AddFailure(context.DisplayName, ResultMessages.PhoneNumberIsDigit);
                });

            return options;
        }

        public static IRuleBuilder<T, string> ExEmail<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .ExNotEmptyAndNotNull()
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage(ResultMessages.IsValidEmail);


            return options;
        }

        public static IRuleBuilder<T, string> ExDate<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .ExNotEmptyAndNotNull()
                .Matches(@"\d{2}-\d{2}-\d{4}")
                .WithMessage("dd-MM-yyyy tarih formatında olması gerekiyor");

            return options;
        }

        public static IRuleBuilder<T, string> ExDateYear<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                        .ExNotEmptyAndNotNull()
                        .Matches(@"^\d{4}$")
                        .WithMessage("yyyy formatında olması gerekiyor");

            return options;
        }
    }
}