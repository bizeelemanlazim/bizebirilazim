import { PAGE_SIZE, baseUrl } from "../utils/constants";
import { InsertAds } from "../utils/types";
import { handleResponse } from "./ResponseHandler";

export const getAllAds = async (token: string, isActive = true) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary?isActive=${isActive}`;
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

export const sendRate = async (
  token: string,
  values: any,
  type: "Employee" | "Employer"
) => {
  const url = `${baseUrl}/api/${
    type === "Employee" ? "employee-management" : "employer-management"
  }/rating`;
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

export const updateRate = async (
  token: string,
  id: number | undefined,
  values: any,
  type: "Employee" | "Employer"
) => {
  const url = `${baseUrl}/api/${
    type === "Employee" ? "employee-management" : "employer-management"
  }/rating/${id}`;
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

export const cancelAppeal = async (token: string, adId: number) => {
  const url = `${baseUrl}/api/employee-management/apply-for-a-job/${adId}`;
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

export const acceptAppeal = async (token: string, applyForAJobId: number) => {
  const url = `${baseUrl}/api/advertisement-management/apply-for-a-job/${applyForAJobId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const finishAppeal = async (token: string, adId: number) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary/finish/${adId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const insertAds = async (token: string, data: InsertAds) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const res = await handleResponse(response);

  return res;
};

export const updateAds = async (token: string, data: any) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const res = await handleResponse(response);

  return res;
};

export const deleteAds = async (token: string, id: number) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary/${id}`;
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

export const getAd = async (token: string, id: number) => {
  const url = `${baseUrl}/api/advertisement-management/advertisement-and-order-summary/${id}`;
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

export const getAppliedJobs = async (token: string) => {
  const url = `${baseUrl}/api/employee-management/apply-for-a-job?isActive=true`;
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

export const employeeApply = async (token: string, adId: number) => {
  const url = `${baseUrl}/api/employee-management/apply-for-a-job/${adId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
};

export const getJobAppeals = async (token: string, id: string) => {
  const url = `${baseUrl}/api/advertisement-management/apply-for-a-job?isActive=true&AdId=${id}`;
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
