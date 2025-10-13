import { api } from "../api";
import generateReport from "./generateReport";
import getAllReports from "./getAllReports";

export const ReportsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllReports: getAllReports(build),
    generateReport: generateReport(build),
  }),
  overrideExisting: true,
});

export const { useLazyGetAllReportsQuery, useGenerateReportMutation } =
  ReportsApi;
