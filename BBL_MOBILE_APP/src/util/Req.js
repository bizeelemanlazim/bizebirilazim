import {Global} from '../util/Base';

const CONS = {
  //URL: 'https://jsonplaceholder.typicode.com/',
  URL: 'https://api.bizebirilazim.com/',
  Methods: {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
  },
  EndPoints: {
    Login: 'api/auth-management/login',
    Register: 'api/auth-management/register',

    GetAllAds: 'api/advertisement-management/advertisement-and-order-summary',
    GetAllApplies: 'api/advertisement-management/apply-for-a-job',

    GetCities: 'api/utilities-management/cities',
    GetDistricts: 'api/utilities-management/districts',
    GetNationalities: 'api/utilities-management/nationalities',
    GetDrivingLicences: 'api/utilities-management/driving-licences',
    GetJobs: 'api/utilities-management/jobs',
    GetUserTypes: 'api/utilities-management/user-types',
    GetMaritalStatusTypes: 'api/utilities-management/marital-status-types',
    GetGenderTypes: 'api/utilities-management/gender-types',
    GetWorkingTypes: 'api/utilities-management/working-types',

    GetEmployer: 'api/employer-management/employers',
    GetPriceRateDetails: 'api/employer-management/price-rate-details',
  },
};

function objectToQueryString(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
}

async function SendReq(data, method = CONS.Methods.GET, urlEx) {
  let sendDta = {};
  if (data && method == CONS.Methods.POST) sendDta.body = JSON.stringify(data);
  if (data && (method == CONS.Methods.GET || method == CONS.Methods.DELETE))
    urlEx = urlEx + '?' + objectToQueryString(data);

  let url = CONS.URL;
  if (urlEx) url += urlEx;

  const headerObj = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (ReqBase._token) {
    headerObj['Authorization'] = 'Bearer ' + ReqBase._token;
  }

  let obj = {
    method: method,
    headers: headerObj,
    ...sendDta,
  };

  console.warn(url, obj);

  Global.Store.setLoadingModalVisible(true);
  let res = await fetch(url, obj)
    .then(response => {
      console.warn(response);
      return response.json();
    })
    .catch(err => {
      console.warn('error,  ', err);
      return err;
    });
  Global.Store.setLoadingModalVisible(false);
  console.warn(res);
  //console.warn('-----------------------------------------------');
  return res;
}

const ReqBase = {
  _token:
    'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6IlVndXJiYXM4QGdtYWlsLmNvbSIsIkFzcFVzZXJJZCI6ImY0YmVmNDAxLTI2NDYtNDMxMi1iNWFiLTg3ZjNkMTg3ZjU3OSIsIlJvbGVzIjoiRW1wbG95ZXIiLCJuYmYiOjE3MDI5MjU2MzIsImV4cCI6MTcwMzE4NDgzMiwiaXNzIjoid3d3LmJpemViaXJpbGF6aW0uY29tIiwiYXVkIjoid3d3LmJpemViaXJpbGF6aW0uY29tIn0.SxE6Yp1F5-zynwEQOnlh_QHIVIKOmC_Lj2ZxwmeCA1w',

  Test: async () => await SendReq(null, CONS.Methods.GET, CONS.EndPoints.Test),
  Login: async data => {
    let res = await SendReq(data, CONS.Methods.POST, CONS.EndPoints.Login);
    ReqBase._token = res.data.token;
    return res;
  },

  Register: async data =>
    await SendReq(data, CONS.Methods.POST, CONS.EndPoints.Register),

  GetAllAds: async data =>
    await SendReq(data, CONS.Methods.GET, CONS.EndPoints.GetAllAds),

  GetAllApplies: async data =>
    await SendReq(data, CONS.Methods.GET, CONS.EndPoints.GetAllApplies),

  GetEmployer: async () =>
    await SendReq(null, CONS.Methods.GET, CONS.EndPoints.GetEmployer),

  GetPriceRateDetails: async () =>
    await SendReq(null, CONS.Methods.GET, CONS.EndPoints.GetPriceRateDetails),
};

const Utilities = {
  GetCities: async () => {
    if (0 === (await Global.Store.cities.length)) {
      let res = await SendReq(null, CONS.Methods.GET, CONS.EndPoints.GetCities);
      let arry = [];
      await res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setCities(arry);
    }
  },

  GetDistricts: async data => {
    let res = await SendReq(
      data,
      CONS.Methods.GET,
      CONS.EndPoints.GetDistricts,
    );
    let arry = [];
    await res?.data?.forEach(item => {
      arry.push({label: item.name, value: item.id});
    });
    return arry;
  },

  GetNationalities: async () => {
    if (0 === (await Global.Store.nationalities.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetNationalities,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setNationalities(arry);
    }
  },

  GetDrivingLicences: async () => {
    if (0 === (await Global.Store.drivingLicences.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetDrivingLicences,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setDrivingLicences(arry);
    }
  },

  GetJobs: async () => {
    if (0 === (await Global.Store.jobs.length)) {
      let res = await SendReq(null, CONS.Methods.GET, CONS.EndPoints.GetJobs);
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setJobs(arry);
    }
  },

  GetUserTypes: async () => {
    if (0 === (await Global.Store.userTypes.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetUserTypes,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setUserTypes(arry);
    }
  },

  GetMaritalStatusTypes: async () => {
    if (0 === (await Global.Store.maritalStatusTypes.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetMaritalStatusTypes,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setMaritalStatusTypes(arry);
    }
  },

  GetGenderTypes: async () => {
    if (0 === (await Global.Store.genderTypes.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetGenderTypes,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setGenderTypes(arry);
    }
  },

  GetWorkingTypes: async () => {
    if (0 === (await Global.Store.workingTypes.length)) {
      let res = await SendReq(
        null,
        CONS.Methods.GET,
        CONS.EndPoints.GetWorkingTypes,
      );
      let arry = [];
      res?.data?.forEach(item => {
        arry.push({label: item.name, value: item.id});
      });
      Global.Store.setWorkingTypes(arry);
    }
  },
};

export default Req = {...ReqBase, ...Utilities};
