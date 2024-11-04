using BBL.Core.Constants;
using BBL.Core.Enums;
using BBL.Core.Models.Results;
using System.Net;

namespace BBL.Core.Utilities.Results
{

    /// <summary>
    /// Represents the result of an operation, encapsulating its status, success or failure, and additional information.
    /// </summary>
    public class Result : IResult
    {
        public Result()
        { }

        protected Result(ResultStatus status)
        {
            Status = status;
        }

        /// <summary>
        /// Gets a value indicating whether the result has an invalid status.
        /// </summary>
        public bool HasInvalid => Status == ResultStatus.Invalid;

        /// <summary>
        /// Gets or sets the status of the result.
        /// </summary>
        public ResultStatus Status { get; protected set; } = ResultStatus.Ok;

        /// <summary>
        /// Gets a value indicating whether the result is successful.
        /// </summary>
        public bool IsSuccess => Status == ResultStatus.Ok;

        /// <summary>
        /// Gets or sets the message associated with the result.
        /// </summary>
        public string? Message { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets a collection of error messages associated with the result.
        /// </summary>
        public IEnumerable<string> Errors { get; set; } = Enumerable.Empty<string>();

        /// <summary>
        /// Gets or sets a list of validation errors associated with an invalid result.
        /// </summary>
        public List<ValidationError> ValidationErrors { get; set; } = new();

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Ok"/> and the specified success message.
        /// </summary>
        public static Result Success()
        {
            return new Result(ResultStatus.Ok);
        }

        public static Result NoContent()
        {
            return new Result(ResultStatus.NotContent);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.Error"/> and the specified error messages.
        /// </summary>
        /// <param name="errorMessages">The error messages.</param>
        public static Result Error(params string[] errorMessages)
        {
            return new Result(ResultStatus.Error) { Errors = errorMessages };
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.Invalid"/> and the specified validation errors.
        /// </summary>
        /// <param name="validationErrors">The validation errors.</param>
        public static Result Invalid(List<ValidationError> validationErrors)
        {
            return new Result(ResultStatus.Invalid) { ValidationErrors = validationErrors };
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.Invalid"/> and a single validation error.
        /// </summary>
        /// <param name="errorMessage">The error message.</param>
        /// <param name="identifier">The identifier associated with the validation error.</param>
        public static Result Invalid(string errorMessage, string identifier)
        {
            return Invalid(
                new List<ValidationError> { new() { Identifier = identifier, ErrorMessage = errorMessage } }
            );
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a specified status.
        /// </summary>
        /// <param name="status">The status of the result.</param>
        protected static Result Create(ResultStatus status)
        {
            return new Result(status);
        }

        /// <summary>
        /// Creates
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.NotFound"/>.
        /// </summary>
        public static Result NotFound()
        {
            return Create(ResultStatus.NotFound);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.Forbidden"/>.
        /// </summary>
        public static Result Forbidden()
        {
            return Create(ResultStatus.Forbidden);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result"/> with a status of <see cref="ResultStatus.Unauthorized"/>.
        /// </summary>
        public static Result Unauthorized()
        {
            return Create(ResultStatus.Unauthorized);
        }
    }

    /// <summary>
    /// Represents the result of an operation, encapsulating its status, success or failure, additional information, and a result data of type T.
    /// </summary>
    public class Result<T> : Result, IResult<T>
    {
        public Result()
        { }

        public Result(T? value)
        {
            Data = value;
        }

        protected Result(ResultStatus status)
            : base(status)
        {
        }

        /// <summary>
        /// Gets or sets the data associated with the result.
        /// </summary>
        public T? Data { get; set; }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Ok"/> and the specified success message.
        /// </summary>
        /// <param name="data">The success data</param>
        /// <param name="successMessage">The success message.</param>
        public static Result<T> Success(T data)
        {
            return new Result<T>(ResultStatus.Ok) { Data = data };
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Error"/> and the specified error messages.
        /// </summary>
        /// <param name="errorMessages">The error messages.</param>
        public new static Result<T> Error(params string[] errorMessages)
        {
            return new Result<T>(ResultStatus.Error) { Errors = errorMessages };
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Invalid"/> and the specified validation errors.
        /// </summary>
        /// <param name="validationErrors">The validation errors.</param>
        public new static Result<T> Invalid(List<ValidationError> validationErrors)
        {
            return new Result<T>(ResultStatus.Invalid) { ValidationErrors = validationErrors };
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Invalid"/> and a single validation error.
        /// </summary>
        /// <param name="errorMessage">The error message.</param>
        /// <param name="identifier">The identifier associated with the validation error.</param>
        public new static Result<T> Invalid(string errorMessage, string identifier)
        {
            return Invalid(
                new List<ValidationError> { new() { Identifier = identifier, ErrorMessage = errorMessage } }
            );
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a specified status.
        /// </summary>
        /// <param name="status">The status of the result.</param>
        protected new static Result<T> Create(ResultStatus status)
        {
            return new Result<T>(status);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.NotFound"/>.
        /// </summary>
        public new static Result<T> NotFound()
        {
            return Create(ResultStatus.NotFound);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Forbidden"/>.
        /// </summary>
        public new static Result<T> Forbidden()
        {
            return Create(ResultStatus.Forbidden);
        }

        /// <summary>
        /// Creates a new instance of <see cref="Result{T}"/> with a status of <see cref="ResultStatus.Unauthorized"/>.
        /// </summary>
        public new static Result<T> Unauthorized()
        {

            var result = Create(ResultStatus.Unauthorized);
            result.Errors.Append("Email address or password is incorrect!");

            return result;
        }
    }

}
