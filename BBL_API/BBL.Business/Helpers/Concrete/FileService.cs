using BBL.Business.Concrete.Base;
using BBL.Business.Helpers.Abstract;
using BBL.Core.Models.Application;
using BBL.Core.Utilities.Results;
using BBL.Core.Utilities.URI;
using BBL.DataAccess.EntityFramework.UnityOfWork;
using BBL.Entities.Identity;
using Castle.Core.Internal;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using IResult = BBL.Core.Utilities.Results.IResult;

namespace BBL.Business.Helpers.Concrete
{
    public class FileService : BBLServiceBase, IFileService
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IOptions<ApplicationSettingsModel> _options;
        private readonly IUriService _uriService;

        public FileService(
            IOptions<ApplicationSettingsModel> options,
            IWebHostEnvironment hostingEnvironment,
            IUowBBL repository,
            IHttpContextAccessor httpContextAccessor,
            IUriService uriService,
            UserManager<ApplicationUser> userManager) : base(repository, httpContextAccessor, userManager)
        {
            _options = options;
            _hostingEnvironment = hostingEnvironment;
            _uriService = uriService;
        }

        public async Task<IResult<string>> FileUpload(IFormFile file, string fileNameModel, string path)
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            if (!String.IsNullOrEmpty(fileNameModel))
            {
                var specificImagePath = Path.Combine(currentDirectory + path, fileNameModel);

                if (File.Exists(specificImagePath))
                {
                    File.SetAttributes(specificImagePath, FileAttributes.Normal);
                    File.Delete(specificImagePath);
                }
            }

            var fileName = Guid.NewGuid() + "-" + file.FileName;
            var filePath = currentDirectory + path + fileName;

            using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                await file.CopyToAsync(fileStream);
                File.SetAttributes(filePath, FileAttributes.Normal);
            }

            return Result<string>.Success(fileName);
        }

        public IResult<string> FileDownload(string fileName, string path)
        {
            if (string.IsNullOrEmpty(fileName))
                return Result<string>.Error("Dosya bulunamadı!");

            var currentDirectory = Directory.GetCurrentDirectory();

            var filePath = Path.Combine(currentDirectory + path, fileName);
            if (File.Exists(filePath) == false)
                return Result<string>.Error("Dosya bulunamadı!");


            String newFilePath = Path.Combine(_hostingEnvironment.ContentRootPath, "Content", "images", fileName);
            if (File.Exists(newFilePath))
            {
                File.SetAttributes(newFilePath, FileAttributes.Normal);
                File.Delete(newFilePath);
            }

            File.Copy(filePath, newFilePath);

            var newFilePathUrl = _uriService.CreateRequestUri("/" + Path.Combine("Content", "images", fileName).Replace("\\", "/")).ToString();

            return Result<string>.Success(newFilePathUrl);
        }

        public IResult FileDelete(string fileName, string path)
        {
            if (String.IsNullOrEmpty(fileName))
                return Result.Error("Dosya bulunamadı!");

            var currentDirectory = Directory.GetCurrentDirectory();
            var filePath = Path.Combine(currentDirectory + path, fileName);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Result.Success();
        }
    }
}
