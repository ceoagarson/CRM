import { IUser } from "../types/user.type";
import { apiClient } from "../utils/AxiosInterceptor";

export const Login = async (
  body: {
    username: string,
    password: string
  }
) => {
  return await apiClient.post("login", body);
};

export const Signup = async (body: FormData) => {
  return await apiClient.post("signup", body);
};
export const NewUser = async (body: FormData) => {
  return await apiClient.post("users", body);
};
export const UpdateUser = async ({ id, body }: { id: string, body: FormData }) => {
  return await apiClient.put(`users/${id}`, body);
};

export const Logout = async () => {
  return await apiClient.post("logout");
};

export const GetUsers = async () => {
  return await apiClient.get("users")
}
export const GetUser = async (id: string) => {
  return await apiClient.get(`users/${id}`)
}
export const DeleteUser = async (id: string) => {
  return await apiClient.delete(`users/${id}`)
}

export const GetProfile = async ()
  : Promise<{ data: IUser }> => {
  return await apiClient.get("profile");
};

export const UpdateProfile = async (body: FormData) => {
  return await apiClient.put("profile", body);
};

// //update password
export const UpdatePassword = async (body: { oldPassword: string, newPassword: string, confirmPassword: string }) => {
  return await apiClient.patch("profile", body)
};
// //update password
export const ResetPassword = async ({ token, body }:
  {
    token: string,
    body: { newPassword: string, confirmPassword: string }
  }) => {
  return await apiClient.patch(`password/reset/${token}`, body)
};

export const ResetPasswordSendMail = async ({ email }:
  {
    email: string
  }) => {
  return await apiClient.post(`password/reset`, { email: email })
};

// //update email
export const VerifyEmail = async (token: string) => {
  return await apiClient.patch(`email/verify/${token}`)
};

export const SendVerifyEmail = async ({ email }:
  {
    email: string
  }) => {
  return await apiClient.post(`email/verify`, { email: email })
};