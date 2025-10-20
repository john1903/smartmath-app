export interface UploadFileRequest {
  file: Blob | File | any;
  category: string;
}

export interface UploadFilePayload {
  data: FormData;
}

export interface UploadFileResponse {
  id: number;
}
