import ServiceBase from "../base";

class AuthService extends ServiceBase {
  path = "/api/auth-management";

  async loginWithGoogle(
    provider: string,
    accessToken: string,
    userTypeId?: number
  ) {
    const response = await super.post(`${this.path}/login/google`, {
      provider,
      accessToken,
      userTypeId,
    });

    return response;
  }

  async registerUser(values: any) {
    const url = `${this.path}/register`;
    const response = await super.post(url, {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      userTypeId: values.UserType,
      commercialTitle: values.commercialTitle,
    });

    return response;
  }
}

var authService = new AuthService();

export default authService;
