export interface ReportFile {
  id: number;
  fileName: string;
  uri: string;
  mimeType: string;
}

export interface Report {
  id: number;
  status: "SUCCESS" | "FAILED" | "PENDING" | "IN_PROGRESS" | string;
  reportFile?: ReportFile | null;
  createdAt?: string;
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface ReportResponse {
  content: Report[];
  page: PageInfo;
}

export interface GenerateReportPayload {
  from: string;
  to: string;
}

// Response model (API returns HTTP 202 Accepted)
export interface GenerateReportResponse {
  status: number;
  message?: string;
}
