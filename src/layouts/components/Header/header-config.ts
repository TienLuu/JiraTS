export interface IMenuUser {
   title: string;
   action: string;
   seperate: boolean;
}

export const menuUser: [IMenuUser] = [
   { title: "Sign out", action: "signout", seperate: true },
];
