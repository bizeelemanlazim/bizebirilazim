using System;
using System.Net;
using System.Text;
using BBL.Core.Utilities.Results;
using Castle.Core.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BBL.Core.Utilities.Sms
{
    public class SmsManager : ISmsService
    {
        private readonly ILogger<SmsManager> _logger;
        private readonly SmsConfiguration _smsConfiguration;

        public SmsManager(ILogger<SmsManager> logger,
                          IOptions<SmsConfiguration> smsConfiguration)
        {
            _logger = logger;
            _smsConfiguration = smsConfiguration.Value;

        }

        public async Task<IResult<string>> Send(SmsMessage sms)
        {
            try
            {
                string username = _smsConfiguration.Username;
                string password = _smsConfiguration.Password;
                string header = _smsConfiguration.Header;
                string appkey = _smsConfiguration.AppKey;

                string url = "https://api.netgsm.com.tr/sms/send/otp";

                string xmlData = "<?xml version='1.0' encoding='iso-8859-9'?> " +
                                 "<mainbody> " +
                                 "<header> " +
                                 "<usercode>" + username + "</usercode> " +
                                 "<password>" + password + "</password> " +
                                 "<msgheader>" + header + "</msgheader> " +
                                 "<appkey>" + appkey + "</appkey> " +
                                 "</header> " +
                                 "<body> " +
                                 "<msg><![CDATA[" + sms.Message + "]]></msg> " +
                                 "<no>" + sms.Receiver + "</no> " +
                                 "</body> " +
                                 "</mainbody>";

                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("Content-Type", "text/xml;charset=UTF-8");

                    StringContent content = new StringContent(xmlData, Encoding.UTF8, "text/xml");

                    HttpResponseMessage response = await client.PostAsync(url, content);
                    response.EnsureSuccessStatusCode();

                    string result = await response.Content.ReadAsStringAsync();

                    _logger.LogInformation("Rapor durum = {0}", result);

                    return Result<string>.Success("SMS başarıyla gönderildi.");
                }
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError(ex, "SMS gönderme sırasında hata oluştu!");
                return Result<string>.Error("SMS gönderme sırasında hata oluştu.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Beklenmeyen bir hata oluştu!");
                return Result<string>.Error("Beklenmeyen bir hata oluştu.");
            }
        }
    }
}

