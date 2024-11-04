using AutoMapper;
using BBL.Core.Models.API.Ad;
using BBL.Core.Models.API.Company;
using BBL.Core.Models.API.Employee;
using BBL.Core.Models.API.Employer;
using BBL.Entities.Concrete;

namespace BBL.Business.Helpers.Mapper
{
    public class AutoMapperHelper : Profile
    {
        public AutoMapperHelper()
        {
            this.CreateMap<Employer, AddEmployerUserModel>().ReverseMap();
            this.CreateMap<Employer, DetailEmployerUserModel>().ReverseMap();
            this.CreateMap<Employer, EditEmployerUserModel>().ReverseMap();

            this.CreateMap<Employee, AddEmployeeUserModel>().ReverseMap();
            this.CreateMap<Employee, EditEmployeeUserModel>().ReverseMap();
            this.CreateMap<Employee, DetailEmployeeUserModel>()
                //.ForMember(
                //    dest => dest.BirthDate,
                //    opt => opt.MapFrom(src => src.BirthDate.HasValue ? src.BirthDate.Value.ToShortDate() : null))
                .ReverseMap();

            this.CreateMap<CertificateInformation, AddCertificateInformationModel>().ReverseMap();
            this.CreateMap<CertificateInformation, DetailCertificateInformationModel>().ReverseMap();
            this.CreateMap<CertificateInformation, EditCertificateInformationModel>().ReverseMap();

            this.CreateMap<AbilityInformation, AddAbilityInformationModel>().ReverseMap();
            this.CreateMap<AbilityInformation, DetailAbilityInformationModel>().ReverseMap();
            this.CreateMap<AbilityInformation, EditAbilityInformationModel>().ReverseMap();

            this.CreateMap<CompanyType, AddCompanyModel>().ReverseMap();
            this.CreateMap<CompanyType, DetailCompanyModel>().ReverseMap();
            this.CreateMap<CompanyType, EditCompanyModel>().ReverseMap();

            this.CreateMap<DisabledStatus, AddDisabledStatusModel>().ReverseMap();
            this.CreateMap<DisabledStatus, DetailDisabledStatusModel>().ReverseMap();
            this.CreateMap<DisabledStatus, EditDisabledStatusModel>().ReverseMap();

            this.CreateMap<EducationInformation, AddEducationInformationModel>().ReverseMap();
            this.CreateMap<EducationInformation, DetailEducationInformationModel>().ReverseMap();
            this.CreateMap<EducationInformation, EditEducationInformationModel>().ReverseMap();

            this.CreateMap<SkillInformation, AddSkillInformationModel>().ReverseMap();
            this.CreateMap<SkillInformation, DetailSkillInformationModel>().ReverseMap();
            this.CreateMap<SkillInformation, EditSkillInformationModel>().ReverseMap();

            this.CreateMap<SocialMediaInformation, AddSocialMediaInformationModel>().ReverseMap();
            this.CreateMap<SocialMediaInformation, DetailSocialMediaInformationModel>().ReverseMap();
            this.CreateMap<SocialMediaInformation, EditSocialMediaInformationModel>().ReverseMap();

            this.CreateMap<WorkExperience, AddWorkExperienceModel>().ReverseMap();
            this.CreateMap<WorkExperience, DetailWorkExperienceModel>().ReverseMap();
            this.CreateMap<WorkExperience, EditWorkExperienceModel>().ReverseMap();

            this.CreateMap<BankAndPersonalInformation, AddBankAndPersonalInformationModel>().ReverseMap();
            this.CreateMap<BankAndPersonalInformation, EditBankAndPersonalInformationModel>().ReverseMap();
            this.CreateMap<BankAndPersonalInformation, DetailBankAndPersonalInformationModel>()
                //.ForMember(
                //    dest => dest.ExpiryDate,
                //    opt => opt.MapFrom(src => src.ExpiryDate.ToShortDate()))
                .ReverseMap();

            this.CreateMap<Ad, InsertAddModel>().ReverseMap();
            this.CreateMap<Ad, DetailAdModel>().ReverseMap();
            this.CreateMap<Ad, EditAddModel>().ReverseMap();

            this.CreateMap<OrderSummary, InsertOrderSummaryModel>().ReverseMap();
            this.CreateMap<OrderSummary, DetailOrderSummary>().ReverseMap();
            this.CreateMap<OrderSummary, EditOrderSummaryModel>().ReverseMap();

            this.CreateMap<BBL.Entities.Concrete.EmployerPriceRate, BBL.Core.Models.API.Employer.EmployerPriceRate>().ReverseMap();

            this.CreateMap<Rating, EmployerAddRatingModel>().ReverseMap();
            this.CreateMap<Rating, EmployeeAddRatingModel>().ReverseMap();

        }
    }
}
