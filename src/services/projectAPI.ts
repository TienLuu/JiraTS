import { ICreateProject } from "../type/project.interface";
import fetcher from "./fetcher";

const projectAPI = {
   createProject: (values: ICreateProject) => {
      return fetcher.post("/Project/createProjectAuthorize", values);
   },

   getProjectDetail: (id: number) => {
      return fetcher("/Project/getProjectDetail", {
         params: {
            id,
         },
      });
   },

   getProjects: (keyword: string | null) => {
      if (!keyword) keyword = null;
      return fetcher("/Project/getAllProject", {
         params: {
            keyword,
         },
      });
   },

   deleteProject: (projectId: string) => {
      return fetcher.delete("/Project/deleteProject", {
         params: {
            projectId,
         },
      });
   },

   updateProject: (projectId: string, values: any) => {
      return fetcher.put("Project/updateProject", values, {
         params: {
            projectId,
         },
      });
   },

   addUserToProject: (values: any) => {
      return fetcher.post("/Project/assignUserProject", values);
   },

   removeUserFromProject: (values: any) => {
      return fetcher.post("/Project/removeUserFromProject", values);
   },

   createTask: (values: any) => {
      return fetcher.post("/Project/createTask", values);
   },

   updateTask: (values: any) => {
      return fetcher.post("Project/updateTask", values);
   },

   deleteTask: (taskId: any) => {
      return fetcher.delete("Project/removeTask", {
         params: {
            taskId,
         },
      });
   },
   getTaskDetail: (taskId: any) => {
      return fetcher("/Project/getTaskDetail", {
         params: {
            taskId,
         },
      });
   },

   addUserToTask: (values: any) => {
      return fetcher.post("/Project/assignUserTask", values);
   },

   removeUserFromTask: (values: any) => {
      return fetcher.post("/Project/removeUserFromTask", values);
   },

   updateTaskStatus: (values: any) => {
      return fetcher.put("/Project/updateStatus", values);
   },

   updateTaskPriority: (values: any) => {
      return fetcher.put("/Project/updatePriority", values);
   },

   updateTaskDescription: (values: any) => {
      return fetcher.put("/Project/updateDescription", values);
   },

   updateTaskTimeTracking: (values: any) => {
      return fetcher.put("/Project/updateTimeTracking", values);
   },

   updateTaskEstimate: (values: any) => {
      return fetcher.put("/Project/updateEstimate", values);
   },
};

export default projectAPI;
