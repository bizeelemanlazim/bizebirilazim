using System;
using System.Linq.Expressions;

namespace BBL.Core.Utilities.Toolkit
{
	public static class HelperExtension
	{
		public static int CalculateAge(this DateTime? dt)
		{
            if (dt is null) return default;
            // Save today's date.
            var today = DateTime.Today;

            // Calculate the age.
            var age = today.Year - dt?.Year;

            // Go back to the year in which the person was born in case of a leap year
            if (dt?.Date > today.AddYears(-(age ?? default))) age--;

            return age ?? default;
        }

        public static IQueryable<T> CustomOrderBy<T>(this IQueryable<T> query, string orderBy)
        {
            if (String.IsNullOrEmpty(orderBy)) return query;
            var arry = orderBy.Split(",");

            if (arry.Length > 0)
            {
                var propertyAndDirectionArry = arry[0].Split(":");
                if (propertyAndDirectionArry[1] == "desc")
                    query = query.CustomOrderByDescending(propertyAndDirectionArry[0]);
                else
                    query = query.CustomOrderByAscending(propertyAndDirectionArry[0]);

                if (arry.Length > 1)
                {
                    for (int i = 1; i < arry.Length; i++)
                    {
                        var propertyAndDirectionArryInner = arry[i].Split(":");
                        if (propertyAndDirectionArryInner[1] == "desc")
                            query = ((IOrderedQueryable<T>)query).CustomThenByDescending(propertyAndDirectionArryInner[0]);
                        else
                            query = ((IOrderedQueryable<T>)query).CustomThenByAscending(propertyAndDirectionArryInner[0]);
                    }
                }
            }
            
            return query;
        }
    }
}

