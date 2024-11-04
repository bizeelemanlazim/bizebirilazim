import { EmployerProfileSettingsType, PersonelInfoFormType, WorkExperienceType } from "./types";

export const defaultEmployerProfile: EmployerProfileSettingsType = {
  companyTypeId: 0,
  email: "",
  firstName: "",
  lastName: "",
  commercialTitle: "",
  phoneNumber: "",
  taxNumber: "",
  taxOffice: "",
  recordNumber: "",
  mersisNumber: "",
  address: "",
  foundedDate: "",
  employeesCount: 0,
  activityFields: "",
  capitalPrice: 0,
  description: ""
}

export const defaultPersonelInfo: PersonelInfoFormType = {
  cityId: 0,
  districtId: 0,
  genderId: 0,
  maritalStatusId: 0,
  drivingLicenceId: 0,
  nationalityId: 0,
  firstName: "",
  lastName: "",
  placeOfBirth: "",
  email: "",
  phoneNumber: "",
  secondPhoneNumber: "",
  birthDate: "",
  address: ""
}

export const WorkExperienceInfo: WorkExperienceType = {
  jobId: 0,
  workingTypeId: 0,
  job: "",
  isWorking: false,
  startDate: "",
  endDate: "",
  workingCompany: "",
  description: "",
}

export const defaultJob = {

}

export const genders = [
  {
    id: 1,
    name: "Erkek"
  },
  {
    id: 2,
    name: 'Kadın'
  }
];

export const civilStatus = [
  {
    id: 1,
    name: "Evli"
  },
  {
    id: 2,
    name: 'Bekar'
  }
]

export const defaultErrorText = "Bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.";