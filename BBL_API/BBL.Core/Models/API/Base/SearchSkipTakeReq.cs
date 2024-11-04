using System;
namespace BBL.Core.Models.API.Base
{
	public class SearchSkipTakeReq : SkipTakeReq
	{
		public string Search { get; set; } = "";
	}
}

