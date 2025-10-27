// login
export interface LoginRequest {
  username: string;
  password: string;
  device_token: string;
}
export interface LoginResponse {
  token: string;
  refreshToken: string;
}

// register user
export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export interface RegisterUserResponse {
  id: number;
}
export interface RegisterUserPayload {
  data: RegisterUserRequest;
  navigation: any;
}

// update user
export interface UpdateUserRequest {
  avatarFileId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export interface UpdateUserPayload {
  data: UpdateUserRequest;
}

export type UpdateUserResponse = void;
