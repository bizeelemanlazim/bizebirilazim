using System.ComponentModel;
using System.Reflection;

namespace System
{
    public static class EnumExtensions
    {
        public static int ToInt(this Enum enumValue)
        {
            return (int)((object)enumValue);
        }

        public static bool IsDefinedInEnum(this Enum value, Type enumType)
        {
            if (value.GetType() != enumType)
                return false;

            return Enum.IsDefined(enumType, value);
        }

        public static string GetDescription<T>(this T enumValue) where T : struct, IConvertible
        {
            if (!typeof(T).IsEnum)
                return null;

            var description = enumValue.ToString();
            var fieldInfo = enumValue.GetType().GetField(enumValue.ToString());

            if (fieldInfo != null)
            {
                var attrs = fieldInfo.GetCustomAttributes(typeof(DescriptionAttribute), true);
                if (attrs != null && attrs.Length > 0)
                {
                    description = ((DescriptionAttribute)attrs[0]).Description;
                }
            }

            return description;
        }

        public static Dictionary<int, string> EnumDictionary<T>() where T : Enum
        {
            if (!typeof(T).IsEnum)
                throw new ArgumentException("Type must be an enum");
            return Enum.GetValues(typeof(T))
                .Cast<T>()
                .ToDictionary(t => (int)(object)t, t => GetEnumDescription(t));
        }

        private static string GetEnumDescription(Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());

            if (field != null)
            {
                DescriptionAttribute attribute =
                    (DescriptionAttribute)Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute));

                if (attribute != null)
                {
                    return attribute.Description;
                }
            }

            // Eğer DescriptionAttribute bulunamazsa, enum üye adını döndür
            return value.ToString();
        }
    }
}
