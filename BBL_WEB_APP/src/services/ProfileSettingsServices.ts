import { StringMappingType } from "typescript";
import { baseUrl } from "../utils/constants";
import {
  CertificateInfoType,
  EducationInfoType,
  EmployerProfileSettingsType,
  PersonelInfoFormType,
  SocialMediaType,
  WorkExperienceType,
} from "../utils/types";
import { handleResponse } from "./ResponseHandler";

export const sendEmployerProfileSetting = async (
  values: EmployerProfileSettingsType,
  token: string
) => {
  const url = `${baseUrl}/api/employer-management/employers`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployerProfileSetting = async (token: string) => {
  const url = `${baseUrl}/api/employer-management/employers`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const uploadPicture = async (
  fd: FormData,
  token: string,
  type: string
) => {
  let url = `${baseUrl}/api/employer-management/images`;
  if (type === "employee") {
    url = `${baseUrl}/api/employee-management/images`;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });

  const res = await handleResponse(response);

  return res;
};

export const deletePicture = async (token: string, type: string) => {
  let url = `${baseUrl}/api/employer-management/images`;
  if (type === "employee") {
    url = `${baseUrl}/api/employee-management/images`;
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const getUserPicture = async (token: string, type: string) => {
  let url = `${baseUrl}/api/employer-management/images`;
  if (type === "employee") {
    url = `${baseUrl}/api/employee-management/images`;
  }
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendEmployeePersonelnfo = async (
  values: PersonelInfoFormType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/employees`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployeePersonelnfo = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/employees`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployeeWorkExperince = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/work-experiences`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendEmployeeWorkExperince = async (
  values: WorkExperienceType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/work-experiences`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const editEmployeeWorkExperince = async (
  id: number,
  values: WorkExperienceType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/work-experiences/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const deleteEmployeeWorkExperince = async (
  id: number,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/work-experiences/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendEmployeeEducation = async (
  values: EducationInfoType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/education-informations`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const editEmployeeEducation = async (
  id: number,
  values: EducationInfoType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/education-informations/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployeeEducation = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/education-informations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const deleteEmployeeEducation = async (id: number, token: string) => {
  const url = `${baseUrl}/api/employee-management/education-informations/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendEmployeeCertificate = async (
  values: CertificateInfoType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/certificate-informations`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const editEmployeeCertificate = async (
  id: number,
  values: CertificateInfoType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/certificate-informations/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployeeCertificate = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/certificate-informations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const deleteEmployeeCertificate = async (id: number, token: string) => {
  const url = `${baseUrl}/api/employee-management/certificate-informations/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const getEmployeeSkill = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/ability-informations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendEmployeeSkill = async (values: any, token: string) => {
  const url = `${baseUrl}/api/employee-management/ability-informations`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const editEmployeeSkill = async (
  id: number,
  values: any,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/ability-informations/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: values,
  });

  const res = await handleResponse(response);

  return res;
};

export const deleteEmployeeSkill = async (id: number, token: string) => {
  const url = `${baseUrl}/api/employee-management/ability-informations/${id}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendSocialMedia = async (
  values: SocialMediaType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/social-media-informations`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const editSocialMedia = async (
  id: number,
  values: SocialMediaType,
  token: string
) => {
  const url = `${baseUrl}/api/employee-management/social-media-informations/${id}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getSocialMedia = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/social-media-informations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const getBankAndIdentity = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/bank-and-personal-informations`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const sendBankAndIdentity = async (values: any, token: string) => {
  const url = `${baseUrl}/api/employee-management/bank-and-personal-informations`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};

export const getCV = async (employeeId: number, token: string) => {
  const url = `${baseUrl}/api/employee-management/cv-informations/${employeeId}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const editBankAndIdentity = async (values: any, token: string) => {
  const url = `${baseUrl}/api/employee-management/bank-and-personal-informations`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  });

  const res = await handleResponse(response);

  return res;
};
