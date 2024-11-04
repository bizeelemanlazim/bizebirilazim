import { JobStatus } from "../../components/MyJobsHeader";
import ServiceBase from "../base";

class AdvertisementManagementService extends ServiceBase {
  path = `/api/advertisement-management`;

  async detailAdAndOrderSummary(
    jobStatus: JobStatus,
    page: number,
    order: string
  ) {
    const response = await super.get(
      `${
        this.path
      }/advertisement-and-order-summary?jobStatus=${jobStatus}&skip=${
        page * 10
      }&take=10&orderBy=${order}`
    );

    return response;
  }
}

var advertisementManagementService = new AdvertisementManagementService();

export default advertisementManagementService;
