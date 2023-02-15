import axios from "axios";
const base_url = "api/v1/";

//get user profile
export const fetchProfileService = async () => {
  return await axios.get(base_url + "profile");
};