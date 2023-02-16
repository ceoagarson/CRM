import axios from "axios";
import { IUser } from "../types/user.type";

let BaseURL = "/api/v1/"
if (process.env.REACT_APP_SERVER_URL)
  BaseURL = process.env.REACT_APP_SERVER_URL + BaseURL

const request = axios.create({
  baseURL: BaseURL,
  withCredentials: true
})

export const Login = async (
  body: {
    username: string,
    password: string
  }
): Promise<{ data: { user: IUser } }> => {
  return await request.post("login", body);
};

export const Signup = async (body: FormData): Promise<{ data: { user: IUser } }> => {
  return await request.post("signup", body);
};
export const NewUser = async (body: FormData): Promise<{ data: { user: IUser } }> => {
  return await request.post("users", body);
};
export const UpdateUser = async ({ id, body }: { id: string, body: FormData }): Promise<string> => {
  return await request.put(`users/${id}`, body);
};

export const Logout = async () => {
  return await request.post("logout");
};

export const GetUsers = async (): Promise<{ data: IUser[] }> => {
  return await request.get("users")
}
export const GetUser = async (id: string): Promise<{ data: IUser }> => {
  return await request.get(`users/${id}`)
}
export const DeleteUser = async (id: string): Promise<string> => {
  return await request.delete(`users/${id}`)
}


export const GetProfile = async ()
  : Promise<{ data: { user: IUser } }> => {
  return await request.get("profile");
};


// edit profile
// export const useProfileMutation = (body) => {
//   return useMutation(async (body) => {
//     return await request.put(base_url + "profile", body);
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
