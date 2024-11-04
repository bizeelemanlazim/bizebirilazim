export type ApiList<T> = {
  data: {
    data: T[];
    totalCount?: number;
  };
  isSuccess: boolean;
};
export type ApiResult<T> = {
  data: T[];
  totalCount?: number;
  isSuccess: boolean;
};

export enum Role {
  Admin = "Admin",
  Employee = "Employee",
  Employer = "Employer",
  Manager = "Manager",
  User = "User",
}

export type BreadCrumbItem = {
  label: string;
  to?: string;
};

export type TabItemType = {
  label: string;
  slug: string;
};

export type BblSelectType = {
  id: string;
  name: string;
};

export type User = {
  id?: string;
  name?: string;
  surname?: string;
  email?: string;
  type?: string;
};

export type EmployerProfileSettingsType = {
  companyTypeId: number;
  email: string;
  firstName: string;
  lastName: string;
  commercialTitle: string;
  phoneNumber: string;
  taxNumber: string;
  taxOffice: string;
  recordNumber: string;
  mersisNumber: string;
  address: string;
  foundedDate: string;
  employeesCount: number;
  activityFields: string;
  capitalPrice: number;
  description: string;
};

export type PersonelInfoFormType = {
  cityId: number;
  districtId: number;
  genderId: number;
  maritalStatusId: number;
  drivingLicenceId: number;
  nationalityId: number;
  firstName: string;
  lastName: string;
  placeOfBirth: string;
  email: string;
  phoneNumber: string;
  secondPhoneNumber: string;
  birthDate: string;
  address: string;
};

export type DisabledFormType = {};

export type WorkExperienceType = {
  id?: number;
  jobId: number;
  job: string;
  workingTypeId: number;
  isWorking: boolean;
  startDate: string;
  endDate: string;
  workingCompany: string;
  description: string;
};

export type EducationInfoType = {
  id?: number;
  school: string;
  section: string;
  startDate: string;
  endDate: string;
  description: string;
  isContinue: boolean;
  isBreak: boolean;
};

export type CertificateInfoType = {
  id?: number;
  certificateName: string;
  certificationInstitution: string;
  startDate: string;
  description: string;
};

export type SkillInfoType = {
  id?: number;
  abilityName: string;
  description: string;
  degree: number;
};

export type SocialMediaType = {
  id?: number;
  youtubeLink: string;
  linkedinLink: string;
  instagramLink: string;
  facebookLink: string;
  twitterLink: string;
};

export type BankAndIdentityType = {
  id?: number;
  bankName: string;
  branchName: string;
  branchCode: string;
  accountName: string;
  iban: string;
  tcIdentityNumber: string;
  tcSerialNumber: string;
  expiryDate: string;
  fatherName: string;
  motherName: string;
  issuingAuthority: string;
  settlementBarcodeNumber: string;
  criminalRecordBarcodeNumber: string;
};

export type City = {
  id: number;
  name: string;
};

export type District = {
  cityId: number;
  id: string;
  name: string;
};

export type WorkType = {
  id: number;
  name: string;
};

export type Gender = {
  id: number;
  name: string;
};

export type Nation = {
  id: number;
  name: string;
};

export type Licence = {
  id: number;
  name: string;
};

export type Job = {
  id: number;
  name: string;
  jobCode: string;
};

export interface DetailAdModel {
  id: number;
  isActive: boolean;
  jobId: number;
  workingTime: string;
  workStartDate: string;
  workEndDate: string;
  workingStartTime: string;
  attribute: string;
  educationId: number;
  experienceId: number;
  sectorId: number;
  education: string;
  experience: string;
  criterion: string;
  isMyAddress: boolean;
  price: number;
  workType: WorkType[];
  gender: Gender[];
  isMyRecruitment: boolean;
}

export interface DetailOrderSummary {
  id: number;
  jobName: string;
  operationTime: string;
  progressPayment: number;
  legalDeduction: number;
  commissionFee: number;
  totalFees: number;
}

export interface DetailAds {
  detailAdModel: DetailAdModel;
  detailOrderSummary: DetailOrderSummary;
}

export interface InsertAddModel {
  jobId: number;
  jobName?: string;
  workingTime: string;
  workType: {
    id: number;
    name: string;
  }[];
  gender: {
    id: number;
    name: string;
  }[];
  educationId: number;
  experienceId: number;
  sectorId: number;
  workStartDate: string;
  workEndDate: string;
  workingStartTime: string;
  attribute: string;
  criterion: {
    id: number;
    name: string;
  }[];
  isMyAddress: boolean;
  cityId: number;
  districtId: number;
  address: string;
  price: number;
  isMyRecruitment: boolean;
}

export interface InsertOrderSummaryModel {
  jobName: string;
  operationTime: string;
  location: string;
  progressPayment: number;
  legalDeduction: number;
  commissionFee: number;
  totalFees: number;
}

export interface InsertAds {
  insertAddModel: InsertAddModel;
  insertOrderSummaryModel: InsertOrderSummaryModel;
}

export type PriceRates = {
  commissionFee: number;
  legalDeduction: number;
};

export type AppealType = {
  id: number;
  applyForJobId: number;
  city: string;
  gender: string;
  image: string;
  isApply: boolean;
  nationality: string;
  name: string;
  age: string;
};

export type CWType = {
  personal: {
    firstName: string;
    lastName: string;
    age: number;
    genderValue: string;
    nationalityValue: string;
    location: string;
    rate: number;
  };
  workExperiences: WorkExperienceType[];
  educationInformations: EducationInfoType[];
  certificateInformations: CertificateInfoType[];
  abilityInformations: SkillInfoType[];
};

export type RateType = {
  id: number;
  applyForJobId: number;
  jobId: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  rate: number;
  comment: string;
};
