using Newtonsoft.Json;
using System.Text;

namespace Microsoft.AspNetCore.Http
{
    public static class SessionExtensions
    {
        public static void Set<T>(this ISession session, string key, T value)
        {
            var serializedObject = JsonConvert.SerializeObject(value);
            var objectBytes = Encoding.UTF8.GetBytes(serializedObject);

            session.Set(key, objectBytes);
        }

        public static T Get<T>(this ISession session, string key)
        {
            var value = session.Get(key);

            if (value == null)
                return default(T);


            var stringObject = Encoding.UTF8.GetString(value);

            return value == null ? default(T) :
                JsonConvert.DeserializeObject<T>(stringObject);
        }

        public static bool Any(this ISession session, string key)
        {
            if (session.Get(key) != null)
                return true;

            return false;
        }

    }
}
