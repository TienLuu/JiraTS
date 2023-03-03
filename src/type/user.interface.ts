export interface TUser {
   email: string;
   name: string;
   passWord: string;
   phoneNumber: string;
}

export interface TUserLogin {
   email: string;
   passWord: string;
}

export interface TUserLS extends TUser {
   accessToken: string;
}

export interface IUserInfos extends TUserLS {
   avatar: string;
   userId: number;
}

export interface TUserSignup extends TUser {
   terms: string;
}
