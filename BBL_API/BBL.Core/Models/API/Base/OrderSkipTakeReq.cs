using System;
namespace BBL.Core.Models.API.Base
{
	public class OrderSkipTakeReq : SkipTakeReq
	{
		public string? OrderBy { get; set; } = null;
	}
}

