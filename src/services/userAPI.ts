import { TUser, TUserLogin } from "../type/user.interface";
import fetcher from "./fetcher";

const userAPI = {
   signup: (values: TUser) => {
      return fetcher.post("/Users/signup", values);
   },

   signin: (values: TUserLogin) => {
      return fetcher.post("/Users/signin", values);
   },

   getUsers: (keyword: string | null) => {
      return fetcher("/Users/getUser", {
         params: {
            keyword,
         },
      });
   },

   getUserByProjectId: (idProject: string) => {
      return fetcher("/Users/getUserByProjectId", {
         params: {
            idProject,
         },
      });
   },

   tesToken: () => {
      return fetcher.post("/Users/TestToken");
   },
};

export default userAPI;
