import { useParams } from "react-router-dom";
import { Draggable } from "react-beautiful-dnd";
import { AvatarGroup } from "@mui/material";

import MoreMenu from "../../../../components/MoreMenu";
import Avatar from "../../../../components/Avatar";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import PathToolTip from "../../../../components/PathToolTip";
import IssuePriorityIcon from "../../../../components/IssuePriorityIcon/IssuePriorityIcon";
import IssueTypeIcon from "../../../../components/IssueTypeIcon/IssueTypeIcon";

import {
   getTaskById,
   toggleTaskModal,
} from "../../../../redux/slices/taskSlice";
import { getProjectDetail } from "../../../../redux/slices/projectSlice";
import projectAPI from "../../../../services/projectAPI";
import { IssueTypeCopy, IssuePriorityCopy } from "../../../../constants/issues";
import { showError, showSuccess } from "../../../../utils/toast";

import {
   StyledButton,
   StyledTitle,
   StyledTaskItem,
   TaskInfo,
   MemberAvatar,
   TaskProperty,
   Title,
} from "./Styles";
import { useAppDispatch } from "../../../../store";

const itemsMenu = [
   {
      title: "Delete",
      action: "delete",
   },
];

interface IProps {
   task: any;
   index: number;
}

const TaskItem = ({ task, index }: IProps) => {
   const { projectId } = useParams();
   const dispatch = useAppDispatch();

   const handleSelectTask = () => {
      dispatch(toggleTaskModal(true));
      dispatch(getTaskById(task.taskId));
   };

   const handleDeleteTask = async (id: number) => {
      try {
         await projectAPI.deleteTask(id);

         showSuccess("Delete task success");
         dispatch(getProjectDetail(projectId));
      } catch (err: any) {
         showError(err);
      }
   };

   const handleSelectMenu = (item: any) => {
      if (item.action === "delete") {
         handleDeleteTask(task.taskId);
      }
   };

   return (
      <Draggable draggableId={task.taskId.toString()} index={index}>
         {(provider, snapshot) => (
            <StyledTaskItem
               {...provider.draggableProps}
               {...provider.dragHandleProps}
               ref={provider.innerRef}
               onClick={handleSelectTask}
            >
               <StyledTitle>
                  <Title>{task.taskName}</Title>
                  <MoreMenu
                     trigger="click"
                     rootActiveClass="taskMenuActive"
                     items={itemsMenu}
                     placement="bottom-end"
                     onChange={handleSelectMenu}
                  >
                     <StyledButton className="taskActionBtn">
                        <Button variant="secondary" className="taskActionBtn">
                           <Icon color="" type="more" />
                        </Button>
                     </StyledButton>
                  </MoreMenu>
               </StyledTitle>
               <TaskInfo>
                  <TaskProperty>
                     <PathToolTip
                        size={32}
                        title={IssueTypeCopy[task.taskTypeDetail.taskType]}
                        arrow
                     >
                        <IssueTypeIcon
                           type={`${task.taskTypeDetail.taskType}`}
                        />
                     </PathToolTip>

                     <PathToolTip
                        size={32}
                        title={IssuePriorityCopy[task.priorityTask.priorityId]}
                        arrow
                     >
                        <IssuePriorityIcon
                           priority={`${task.priorityTask.priorityId}`}
                        />
                     </PathToolTip>
                  </TaskProperty>
                  <MemberAvatar>
                     <AvatarGroup
                        max={4}
                        total={task.assigness.length}
                        sx={{
                           "& .MuiAvatar-root": {
                              width: 20,
                              height: 20,
                              fontSize: 12,
                           },
                        }}
                        className="styledGroup"
                     >
                        {task.assigness.map((item: any) => (
                           <Avatar
                              name=""
                              square={false}
                              className="memberAvatar"
                              avatarUrl={item.avatar}
                              alt={item.name}
                              size={24}
                              key={item.name}
                           />
                        ))}
                     </AvatarGroup>
                  </MemberAvatar>
               </TaskInfo>
            </StyledTaskItem>
         )}
      </Draggable>
   );
};

export default TaskItem;
