using System;
namespace BBL.Core.Models.API.Base
{
	public class SkipTakeReq
	{
		public int Skip { get; set; } = 0;
		public int Take { get; set; } = 10;
	}
}

