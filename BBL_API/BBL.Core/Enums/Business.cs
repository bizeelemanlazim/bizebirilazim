using System.ComponentModel;

namespace BBL.Core.Enums
{
    public enum UserType
    {
        [Description("SuperAdmin")]
        SuperAdmin = 1,

        [Description("Employer")]
        Employer,

        [Description("Employee")]
        Employee
    }

    public enum CallBackUrlType
    {
        [Description("GenerateResetPassword")]
        GenerateResetPassword = 1,

        [Description("EmailConfirmation")]
        EmailConfirmation
    }

    public enum MartialStatusType
    {
        [Description("Bekar")]
        Single = 1,

        [Description("Evli")]
        Married,

        [Description("Belirtmek istemiyorum")]
        Unknown
    }

    public enum GenderType
    {
        [Description("Erkek")]
        Male = 1,

        [Description("Kadın")]
        Female,

        [Description("Belirtmek istemiyorum")]
        Unknown
    }

    public enum WorkingType
    {
        [Description("Serbest")]
        Serbest = 1,

        [Description("Yarı Zamanlı")]
        YarıZamanlı,

        [Description("Dönemsel")]
        Donemsel,

        [Description("Stajyer")]
        Stajyer,

        [Description("Tam Zamanlı")]
        TamZamanlı,

        [Description("Gönüllü")]
        Gonullu
    }

    public enum SectorType
    {
        [Description("Sağlık")]
        Health = 1,

        [Description("Güvenlik")]
        Security,

        [Description("Gıda")]
        Meal
    }

    public enum EducationType
    {
        [Description("İlköğretim")]
        Primary = 1,

        [Description("Ortaöğretim")]
        Secondary,

        [Description("Yükseköğretim")]
        High
    }

    public enum ExperienceType
    {
        [Description("Başlangıç")]
        Junior = 1,

        [Description("Uzman Yardımcısı")]
        Middle,

        [Description("Uzman")]
        Senior
    }

    public enum CompanyType
    {
        [Description("Şirket Tipi 1")]
        CompanyTypeOne = 1,

        [Description("Şirket Tipi 2")]
        CompanyTypeTwo,

        [Description("Şirket Tipi 3")]
        CompanyTypeThree
    }

    public enum FundType
    {
        [Description("Sermaye Tipi 1")]
        FundTypeOne = 1,

        [Description("Sermaye Tipi 2")]
        FundTypeTwo,

        [Description("Sermaye Tipi 3")]
        FundTypeThree
    }

    public enum CriteriaType
    {
        [Description("Kriter 1")]
        CriteriaOne = 1,

        [Description("Kriter 2")]
        CriteriaTwo,

        [Description("Kriter 3")]
        CriteriaThree
    }

    public enum AbilityType
    {
        [Description("Excel")]
        Excel = 1,

        [Description("Word")]
        Word,

        [Description("Powerpoint")]
        Powerpoint,

        [Description("İngilizce")]
        English,
        [Description("Almanca")]
        Almanca,
        [Description("Python ")]
        Python
    }
}
