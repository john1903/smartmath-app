export interface Avatar {
  id: number;
  fileName: string;
  uri: string;
  mimeType: string;
}

export interface Role {
  name: string;
}

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: Avatar;
  roles?: Role[];
}

export const mapUserDetailResponse = (data: any): UserModel => ({
  id: data?.id ?? 0,
  firstName: data?.firstName ?? "",
  lastName: data?.lastName ?? "",
  email: data?.email ?? "",
  avatar: data?.avatar
    ? {
        id: data?.avatar?.id ?? 0,
        fileName: data?.avatar?.fileName ?? "",
        uri: data?.avatar?.uri ?? "",
        mimeType: data?.avatar?.mimeType ?? "",
      }
    : undefined,
  roles: data?.roles?.map((role: any) => ({ name: role?.name ?? "" })) ?? [],
});
