import { AxiosError } from "axios";
import { IUser } from "../types/user.type";
import { apiClient } from "../utils/AxiosInterceptor";

export const Login = async (
  body: {
    username: string,
    password: string
  }
): Promise<{ data: { user: IUser } }> => {
  return await apiClient.post("login", body);
};

export const Signup = async (body: FormData): Promise<{ data: { user: IUser } }> => {
  return await apiClient.post("signup", body);
};
export const NewUser = async (body: FormData): Promise<{ data: { user: IUser } }> => {
  return await apiClient.post("users", body);
};
export const UpdateUser = async ({ id, body }: { id: string, body: FormData }): Promise<string> => {
  return await apiClient.put(`users/${id}`, body);
};

export const Logout = async () => {
  return await apiClient.post("logout");
};

export const GetUsers = async (): Promise<{ data: IUser[] }> => {
  return await apiClient.get("users")
}
export const GetUser = async (id: string): Promise<{ data: IUser }> => {
  return await apiClient.get(`users/${id}`)
}
export const DeleteUser = async (id: string): Promise<string> => {
  return await apiClient.delete(`users/${id}`)
}


export const GetProfile = async ()
  : Promise<{ data: IUser }> => {
  return await apiClient.get("profile");
};

export const UpdateProfile = async (body: FormData): Promise<{ data: { user: IUser } }> => {
  return await apiClient.put("profile", body);
};
// edit profile
// export const useProfileMutation = (body) => {
//   return useMutation(async (body) => {
//     return await apiClient.put(base_url + "profile", body);
//   });
// };
//login user

// //signup user

//logout user

// //change password
// export const useUpdatePasswordMutation = (body) => {
//   return useMutation(async (body) => {
//     return await axios.patch(base_url + "password/update", body);
//   });
// };

// //send password reset mail
// export const useSendResetPasswordMutation = (email) => {
//   return useMutation(async (email) => {
//     return await axios.post(base_url + "password/forgot", email);
//   });
// };

// //send email verify mail
// export const useSendVerifyEmailMutation = (email) => {
//   return useMutation(async (email) => {
//     return await axios.post(base_url + "email/verify", email);
//   });
// };

// //reset password
// export const useResetPasswordMutation = (body) => {
//   return useMutation(async (body) => {
//     return await axios.put(base_url + `/password/reset/${body.token}`, body);
//   });
// };

// //verify email
// export const useVerifyEmailMutation = (token) => {
//   return useMutation(async (token) => {
//     return await axios.put(base_url + `/email/verify/${token}`);
//   });
// };
// //get all users
// export const useGetIUsers = () => {
//   return useQuery("users", async () => {
//     return await axios.get(base_url + "users");
//   });
// };
