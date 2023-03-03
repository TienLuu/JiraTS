export interface IProject {
   projectName: string;
   alias: string;
}

export interface ICreateProject {
   projectName: string;
   description: string;
   categoryId: number;
   alias: string;
}

export interface IProjectDetailType {
   alias: string;
   creator: {
      id: number;
      name: string;
   };
   description: string;
   id: number;
   lstTask: string[];
   members: [];
   projectCategory: {
      id: number;
      name: string;
   };
   projectName: string;
}

export interface IUpUpdateProject {
   id: number;
   projectName: string;
   creator: number;
   description: string;
   categoryId: string;
}
