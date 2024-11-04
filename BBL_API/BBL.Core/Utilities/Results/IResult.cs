namespace BBL.Core.Utilities.Results
{
    public interface IResult
    {
        bool IsSuccess { get; }
        string Message { get; }
    }

    public interface IResult<T> : IResult
    {
        T? Data { get; set; }
    }
}