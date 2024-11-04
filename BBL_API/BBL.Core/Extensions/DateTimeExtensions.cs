namespace BBL
{
    public static class DateTimeExtensions
    {
        public static string ToShortDate(this DateTime date) => date.ToString("dd-MM-yyyy");

        public static DateTime ToStringShortDate(this string date) => DateTime.Parse(date);
    }
}
