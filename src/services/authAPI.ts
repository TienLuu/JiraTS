import { TUser, TUserLogin } from "../type/user.interface";
import fetcher from "./fetcher";

const authAPI = {
   signin: (values: TUserLogin) => {
      return fetcher.post("Users/signin", values);
   },
   signup: (values: TUser) => {
      return fetcher.post("Users/signup", values);
   },
};

export default authAPI;
