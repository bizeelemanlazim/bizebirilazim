import {observable, makeObservable, computed, action} from 'mobx';

export class CommonStore {
  @observable loadingModal = false;

  @observable cities = [];
  @observable nationalities = [];
  @observable drivingLicences = [];
  @observable jobs = [];
  @observable userTypes = [];
  @observable maritalSatusTypes = [];
  @observable genderTypes = [];
  @observable workingTypes = [];

  constructor() {
    makeObservable(this);
  }

  // Use @action to modify state value
  @action setLoadingModalVisible = value => {
    this.loadingModal = value;
  };

  @action setCities = data => {
    this.cities = data;
  };

  @action getCities = () => {
    return this.cities;
  };

  @action getCitiesCount = () => {
    return this.cities.length;
  };

  @action setNationalities = data => {
    this.nationalities = data;
  };

  @action setDrivingLicences = data => {
    this.drivingLicences = data;
  };

  @action setJobs = data => {
    this.jobs = data;
  };

  @action setUserTypes = data => {
    this.userTypes = data;
  };

  @action setMaritalSatusTypes = data => {
    this.maritalSatusTypes = data;
  };

  @action setGenderTypes = data => {
    this.genderTypes = data;
  };

  @action setWorkingTypes = data => {
    this.workingTypes = data;
  };
}
