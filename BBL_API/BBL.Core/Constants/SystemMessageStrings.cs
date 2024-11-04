namespace BBL
{
    public static class ResultMessages
    {
        #region General

        public static string Successful = "Başarılı";
        public static string UserNameOrPasswordIncorrect = "Kullanıcı adı veya şifre hatalı";
        public static string EmailValidationError = "Lütfen email doğrulamasını yapınız";
        public static string IsNullAndIsEmpty = "Bu alan boş geçilemez";
        public static string IsZeroControl = "Lütfen 0 dan farklı bir değer giriniz";
        public static string IsValidRole = "Kullanıcı uygun rolde değildir!";


        #endregion

        #region Google with login
        public static string GoogleUserInformationCouldNotBeAccessed = "Google kullanıcı bilgilerine erişilemedi.";
        public static string UserTypeNotSelected = "Lütfen kullanıcı tipi seçiniz.";
        #endregion

        #region Email

        public static string IsValidEmail = "Lütfen geçerli bir email giriniz";

        #endregion

        #region PhoneNumber

        public static string PhoneIsValid = "Lütfen geçerli bir telefon numarası giriniz";
        public static string PhoneNumberLength = "Lütfen telefon numarasını 10 karakter giriniz";
        public static string PhoneNumberIsDigit = "Lütfen sadece sayısal değer giriniz";

        #endregion

        #region Password

        public static string PasswordIsValidPassword = "Lütfen geçerli şifre giriniz";
        public static string PasswordIsValidUpperChacter = "Şifreniz en az 1 adet büyük karakter olmalıdır";
        public static string PasswordIsValidLowerChacter = "Şifreniz en az 1 adet küçük karakter olmalıdır";
        public static string PasswordIsValidDigitChacter = "Şifreniz en az 1 adet sayı olmalıdır";
        public static string PasswordIsValidSymbolChacter = "Şifreniz en az 1 adet sembol olmalıdır";
        public static string PasswordIsMinimumLength = "Şifreniz en az 8 karakter olmalıdır";
        public static string PasswordIsMaximumLength = "Şifreniz en az 16 karakter olmalıdır";
        public static string PasswordsShouldMatch = "Şifreler uyuşmuyor";

        #endregion


    }

    public static class AspectMessages
    {
        public static string WrongValidationType => "Yanlış doğrulama türü.";

        public static string WrongLoggerType => "Yanlış Kaydedici Türü";
    }

    public static class SerilogMessages
    {
        public static string NullOptionsMessage = "Boş bir değer gönderdiniz! Bir şeyler yanlış gitti. Lütfen tekrar deneyin.";
    }

    public static class SwaggerMessages
    {
        public static string Version => "v1";
        public static string Title => "BBL";
        public static string TermsOfService => "https://www.bizebirilazim.com";
        public static string ContactName => "BBL";
        public static string LicenceName => "Use under LICX";
        public static string ContactEMail => "support@bizebirilazim.com";
        public static string ContactUrl => "https://www.bizebirilazim.com";
        public static string LicenceUrl => "https://www.bizebirilazim.com";
        public static string Description => "This is a Web API for BBL operations";
    }
}