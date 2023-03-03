import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import projectAPI from "../../services/projectAPI";
import { IssueStatusCopy } from "../../constants/issues";

interface ITask {
   listUserAsign: [];
   taskName: string;
   description: string;
   statusId: string;
   originalEstimate: number;
   timeTrackingSpent: number;
   timeTrackingRemaining: number;
   projectId: number;
   typeId: number;
   priorityId: number;
}

interface ITaskSlice {
   task: ITask | null;
   loading: boolean;
   error: any;
   isTaskModalOpen: Boolean;
}

const initialState: ITaskSlice = {
   task: null,
   loading: false,
   error: false,
   isTaskModalOpen: false,
};

export const getTaskById = createAsyncThunk<any, any>(
   "task/getTaskById",
   async (taskId) => {
      try {
         const data: any = await projectAPI.getTaskDetail(taskId);

         data.taskStatusDetail = {
            id: data.statusId,
            statusName: IssueStatusCopy[data.statusId],
         };

         return data;
      } catch (error) {
         throw error;
      }
   }
);

const taskSlice = createSlice({
   name: "task",
   initialState,
   reducers: {
      toggleTaskModal: (state, action) => {
         return {
            ...state,
            isTaskModalOpen: !!action.payload,
         };
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getTaskById.pending, (state, action) => {
         return {
            ...state,
            loading: true,
            error: false,
         };
      });

      builder.addCase(getTaskById.fulfilled, (state, action) => {
         return {
            ...state,
            loading: false,
            task: action.payload,
         };
      });

      builder.addCase(getTaskById.rejected, (state, action) => {
         return {
            ...state,
            loading: false,
            error: action.error.message,
         };
      });
   },
});

export const { toggleTaskModal } = taskSlice.actions;
export default taskSlice.reducer;
