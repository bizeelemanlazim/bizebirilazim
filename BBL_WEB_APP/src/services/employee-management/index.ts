import { PAGE_SIZE } from "../../utils/constants";
import ServiceBase from "../base";

class EmployeeManagementService extends ServiceBase {
  path = `/api/employee-management`;

  async employeeAdvertisementAndOrderSummary(
    page: number,
    order: string,
    filters: any
  ) {
    const response = await super.post(
      `${
        this.path
      }/employee-advertisement-and-order-summary?isActive=true&OrderBy=${order}&skip=${
        (page - 1) * PAGE_SIZE
      }&take=${PAGE_SIZE}`,
      filters
    );

    return response;
  }
}

var employeeManagementService = new EmployeeManagementService();

export default employeeManagementService;
