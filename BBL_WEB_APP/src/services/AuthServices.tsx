import { baseUrl } from "../utils/constants";
import { handleResponse } from "./ResponseHandler";

export const registerUser = async (values: any) => {
  const url = `${baseUrl}/api/auth-management/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      userTypeId: values.UserType,
      commercialTitle: values.commercialTitle,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const loginUser = async (email: string, password: string) => {
  const url = `${baseUrl}/api/auth-management/login`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const refreshToken = async (token: string) => {
  const url = `${baseUrl}/api/auth-management/refresh-token`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const changePassword = async (
  password: string,
  newPassword: string,
  newPassword2: string,
  token: string
) => {
  const url = `${baseUrl}/api/auth-management/change-password`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      currentPassword: password,
      newPassword: newPassword,
      confirmPassword: newPassword2,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const forgotPasswordEmailSend = async (email: string) => {
  const url = `${baseUrl}/api/auth-management/forgot-password-email-send`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const forgotPasswordSend = async (
  token: string,
  userId: string,
  newPassword: string,
  newPassword2: string
) => {
  const url = `${baseUrl}/api/auth-management/forgot-password-send`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      token: token,
      password: newPassword,
      confirmPassword: newPassword2,
    }),
  });

  const res = await handleResponse(response);

  return res;
};

export const confirmEmail = async (token: string, userId: string) => {
  const url = `${baseUrl}/api/auth-management/confirm-email`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      userId,
    }),
  });

  const res = await handleResponse(response);

  return res;
};
