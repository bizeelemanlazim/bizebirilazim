using BBL.Core.Utilities.Results;
using Microsoft.AspNetCore.Http;
using IResult = BBL.Core.Utilities.Results.IResult;

namespace BBL.Business.Helpers.Abstract
{
    public interface IFileService
    {
        Task<IResult<string>> FileUpload(IFormFile file, string fileName, string path);
        IResult<string> FileDownload(string fileName, string path);
        IResult FileDelete(string fileName, string path);
    }
}