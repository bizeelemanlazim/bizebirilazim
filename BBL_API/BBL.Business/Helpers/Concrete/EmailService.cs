using BBL.Business.Helpers.Abstract;
using BBL.Core.Enums;
using BBL.Core.Utilities.Mail;
using BBL.Core.Utilities.Results;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Concrete;
using BBL.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace BBL.Business.Helpers.Concrete
{
    public class EmailService : IEmailService
    {
        private readonly IMailService _mailService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUowBBL _repository;
        public EmailService(
            IMailService mailService,
            UserManager<ApplicationUser> userManager,
            IUowBBL repository)
        {
            _mailService = mailService;
            _userManager = userManager;
            _repository = repository;
        }

        public async Task<IResult> SendEmail(EmailMessage emailMessage)
        {
            var result = await _mailService.Send(emailMessage);
            return result;
        }

        public async Task<IResult> ConfirmEmailSend(string userId, string url)
        {
            if (string.IsNullOrEmpty(userId))
                return Result.Error("Kullanıcı id eksik");

            if (string.IsNullOrEmpty(url))
                return Result.Error("Url eksik");

            var model = new EmailMessage();
            string? fullName = "";

            var applicationUser = await _userManager.FindByIdAsync(userId);
            var applicationRole = await _userManager.GetRolesAsync(applicationUser);

            if (applicationRole.FirstOrDefault() == UserType.Employer.GetDescription())
            {
                var employer = _repository
                    .Employer
                    .Queryable
                    .Select(x => new Employer
                    {
                        FirstName = x.FirstName,
                        LastName = x.LastName
                    })
                    .FirstOrDefault(x => x.AspNetUserId == applicationUser.Id);
                fullName = employer?.GetFormattedName();
            }

            if (applicationRole.FirstOrDefault() == UserType.Employee.GetDescription())
            {
                var employee = _repository
                    .Employee
                    .Queryable
                    .Select(x => new Employee
                    {
                        FirstName = x.FirstName,
                        LastName = x.LastName
                    })
                    .FirstOrDefault(x => x.AspNetUserId == applicationUser.Id);
                fullName = employee?.GetFormattedName();
            }

            model.ToAddresses = new List<EmailAddress> {
                    new EmailAddress {
                        Address = applicationUser.Email,Name=$"{fullName}"
                    }
                };

            model.Subject = "Email Doğrulama";
            model.Content = string.Empty;
            model.Content += "<!DOCTYPE html><html><head></head><body>";
            model.Content += "<p>Hoşgeldiniz Sayın " + $"{fullName}" + ",</p>";
            model.Content += "<br/><br/>";
            model.Content += "Lütfen aktivasyon için <a href='" + url + "'>Buraya</a> tıklayın";

            return await _mailService.Send(model);
        }

        public async Task<IResult> ResetPasswordMailSend(string userId, string url)
        {
            if (string.IsNullOrEmpty(userId))
                return Result.Error("Kullanıcı id eksik");

            if (string.IsNullOrEmpty(url))
                return Result.Error("Url eksik");

            var model = new EmailMessage();
            string fullName = "";
            var applicationUser = await _userManager.FindByIdAsync(userId);

            var applicationRole = await _userManager.GetRolesAsync(applicationUser);

            if (applicationRole.FirstOrDefault() == UserType.Employer.GetDescription())
            {
                var employer = _repository.Employer.FirstOrDefault(x => x.AspNetUserId == applicationUser.Id);
                fullName = employer.GetFormattedName();
            }

            model.ToAddresses = new List<EmailAddress> {
                    new EmailAddress {
                        Address = applicationUser.Email, Name = fullName
                    }
                };
            model.Subject = "Şifre sıfırlama";
            model.Content = string.Empty;
            model.Content += "<!DOCTYPE html><html><head></head><body>";
            model.Content += "<p>Merhaba Sayın " + fullName + ",</p>";
            model.Content += "<br/><br/>";
            model.Content += "Lütfen şifre sıfırlamak için <a href='" + url + "'>Buraya</a> tıklayın";

            return await _mailService.Send(model);
        }
    }
}
