import axios from "../../utils/axios";
import { enqueueSnackbar } from "notistack";
import { getValidationErrors } from "../../utils/utils";

export default class ServiceBase {
  async get(url: string) {
    try {
      const response = await axios.get(url);

      ServiceBase.errorHandler(response?.data);

      return response?.data;
    } catch (error) {
      ServiceBase.errorHandler(error);

      return error;
    }
  }

  async post(url: string, data: any) {
    try {
      const response = await axios.post(url, data);

      ServiceBase.errorHandler(response?.data);

      return response?.data;
    } catch (error) {
      ServiceBase.errorHandler(error);

      return error;
    }
  }

  async delete(url: string) {
    try {
      const response = await axios.delete(url);

      ServiceBase.errorHandler(response?.data);

      return response?.data;
    } catch (error) {
      ServiceBase.errorHandler(error);

      return error;
    }
  }

  async put(url: string, data: any) {
    try {
      const response = await axios.put(url, data);
      ServiceBase.errorHandler(response?.data);

      return response?.data;
    } catch (error) {
      ServiceBase.errorHandler(error);

      return error;
    }
  }

  static errorHandler(error: any): any {
    if (!error || error.isSuccess) {
      return;
    }

    if (error.internalMessage) {
      enqueueSnackbar(error.internalMessage, { variant: "error" });
    } else if (error.errors && error.errors.length > 0) {
      const internalMessage = getValidationErrors(error.errors);
      enqueueSnackbar(internalMessage, { variant: "error" });
    } else if (error.message) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }
}
