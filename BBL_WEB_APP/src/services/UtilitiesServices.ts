import { baseUrl } from "../utils/constants";
import { handleResponse } from "./ResponseHandler";

export const getAllCities = async () => {
  const url = `${baseUrl}/api/utilities-management/cities`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await handleResponse(response);

  return res;
}

export const getAllDistrict = async (cityId: number) => {
  const url = `${baseUrl}/api/utilities-management/districts?cityId=${cityId}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await handleResponse(response);

  return res;
}

export const getAllNation = async () => {
  const url = `${baseUrl}/api/utilities-management/nationalities`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await handleResponse(response);

  return res;
}

export const getAllDrivingLicence = async () => {
  const url = `${baseUrl}/api/utilities-management/driving-licences`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await handleResponse(response);

  return res;
}

export const getAllJobs = async () => {
  const url = `${baseUrl}/api/utilities-management/jobs`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const res = await handleResponse(response);

  return res;
}

export const getPriceRates = async (token: string) => {
  const url = `${baseUrl}/api/employer-management/price-rate-details`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  const res = await handleResponse(response);

  return res;
}