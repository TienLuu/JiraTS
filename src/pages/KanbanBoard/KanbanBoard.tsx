import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AvatarGroup, Tooltip } from "@mui/material";
import { DragDropContext } from "react-beautiful-dnd";

import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupRemoveOutlinedIcon from "@mui/icons-material/GroupRemoveOutlined";

import useRequest from "../../hooks1/useRequest";
import anothersAPI from "../../services/anothersAPI";
import projectAPI from "../../services/projectAPI";
import userAPI from "../../services/userAPI";
import { getProjectDetail, reOrderTask } from "../../redux/slices/projectSlice";

import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import MenuSelect from "../../components/MenuSelect";
import TaskList from "./TaskList";
// import TaskDetailModal from "./TaskDetailModal";

import { showError, showSuccess } from "../../utils/toast";
import projectOwnerImg from "../../assets/images/meow.png";
import {
   GroupControl,
   CreatorAvatar,
   GroupAvatar,
   ButtonControl,
   StyledButtonUser,
   MemberItem,
   StyledButtonRemove,
   StyledTitle,
   StyledContent,
   StatusColumn,
} from "./Styles";
import { RootState, useAppDispatch } from "../../store";
import { IStatus } from "../../type/task.interface";

const StyledTooltip = ({ children, ...passProp }: any) => (
   <Tooltip
      children={children}
      title
      arrow
      PopperProps={{
         sx: {
            "& .MuiTooltip-tooltip": {
               fontSize: "13px",
            },
         },
      }}
      disableInteractive
      {...passProp}
   />
);

const KanbanBoard = () => {
   const { selectedProject } = useSelector((state: RootState) => state.project);
   const { users } = useSelector((state: RootState) => state.user);
   const { projectId } = useParams();
   const [issuesStatus, setIssueStatus] = useState<IStatus[]>([]);
   const dispatch = useAppDispatch();
   const getIssueStatus = useRequest(anothersAPI.getTaskStatus);

   useEffect(() => {
      fechData();
   }, []);

   const taskNewModalRef = useRef();

   const fechData = async () => {
      const data = await getIssueStatus.runAsync();
      setIssueStatus(data);
   };

   const handleAddUser = async (item: any) => {
      try {
         await projectAPI.addUserToProject({
            userId: item.userId,
            projectId: projectId,
         });

         showSuccess("Invited member to the project success");
         dispatch(getProjectDetail(projectId));
      } catch (err: any) {
         showError(err);
      }
   };

   const handleRemoveUser = async (item: any) => {
      try {
         await projectAPI.removeUserFromProject({
            userId: item.userId,
            projectId: projectId,
         });

         showSuccess("Removed member out of the project success");
         dispatch(getProjectDetail(projectId));
      } catch (err: any) {
         showError(err);
      }
   };

   const handleDropEnd = (result: any) => {
      const { destination, source, draggableId } = result;
      if (!destination) {
         return;
      }

      if (
         destination.droppableId === source.droppableId &&
         destination.index === source.index
      ) {
         return;
      }

      dispatch(reOrderTask(result));
      projectAPI
         .updateTaskStatus({
            taskId: draggableId,
            statusId: destination.droppableId,
         })
         .then(() => {
            showSuccess("Update success");
         })
         .catch((err: any) => {
            showError(err);
            dispatch(getProjectDetail(projectId));
         });
   };

   const handleSelect = (item: any, method: object) => {
      return { item, method };
   };

   return (
      <div>
         <StyledTitle>
            <h2>Kanban Board</h2>
         </StyledTitle>
         <GroupControl>
            <CreatorAvatar>
               <Avatar
                  size={32}
                  name=""
                  square={false}
                  className="memberAvatar"
                  avatarUrl={projectOwnerImg}
                  alt={selectedProject?.creator.name + " ✨"}
               />
            </CreatorAvatar>
            <GroupAvatar>
               <MenuSelect
                  placement="bottom"
                  hideOnSelect={true}
                  items={users || []}
                  maxRender={5}
                  serviceAPI={userAPI.getUsers}
                  renderItem={(item: any) => (
                     <MemberItem key={item.userId}>
                        <Avatar
                           alt=""
                           className=""
                           name=""
                           square={false}
                           avatarUrl={item.avatar}
                           size={24}
                        />
                        <span>{item.name}</span>
                        {selectedProject?.members.find(
                           (member: any) => member.userId === item.userId
                        )
                           ? "✅"
                           : null}
                        {item.userId === selectedProject?.creator.id
                           ? " ✨ "
                           : null}
                     </MemberItem>
                  )}
                  onChange={handleAddUser}
                  getSearchKey={(item) => item.name}
                  getItemsKey={(item) => item.userId}
                  rootClass="manageUserBtn"
                  defaultPlaceHolder={
                     <StyledTooltip title="Add member">
                        <StyledButtonUser>
                           <PersonAddAltOutlinedIcon />
                        </StyledButtonUser>
                     </StyledTooltip>
                  }
               />
               <MenuSelect
                  placement="bottom"
                  onChange={(item, method) => handleSelect(item, method)}
                  items={selectedProject?.members || []}
                  maxRender={5}
                  renderItem={(item: any) => (
                     <MemberItem key={item.userId}>
                        <Avatar
                           alt=""
                           className=""
                           name=""
                           square={false}
                           avatarUrl={item.avatar}
                           size={24}
                        />
                        <span>{item.name}</span>
                        {item.userId === selectedProject?.creator.id
                           ? " ✨ "
                           : null}
                        <StyledButtonRemove>
                           <Button
                              children=""
                              className=""
                              variant="danger"
                              iconSize={16}
                              icon1="close"
                              onClick={() => {
                                 handleRemoveUser(item);
                              }}
                           ></Button>
                        </StyledButtonRemove>
                     </MemberItem>
                  )}
                  hideOnSelect={false}
                  getSearchKey={(item) => item.name}
                  getItemsKey={(item) => item.userId}
                  rootClass="manageUserBtn"
                  defaultPlaceHolder={
                     <StyledTooltip title="Remove member">
                        <StyledButtonUser>
                           <GroupRemoveOutlinedIcon />
                        </StyledButtonUser>
                     </StyledTooltip>
                  }
               />
               <AvatarGroup
                  total={selectedProject?.members.length}
                  sx={{
                     "& .MuiAvatar-root": {
                        width: 30,
                        height: 30,
                        fontSize: 14,
                     },
                  }}
                  className="styledGroup"
               >
                  {selectedProject?.members.map((item: any) => (
                     <Avatar
                        size={32}
                        name=""
                        square={false}
                        className="memberAvatar"
                        avatarUrl={item.avatar}
                        alt={item.name}
                        key={item.userId}
                     />
                  ))}
               </AvatarGroup>
            </GroupAvatar>
            <ButtonControl>
               <Button variant="secondary" className="hightlight">
                  Only My Issues
               </Button>
               <Button variant="secondary" className="hightlight">
                  Recently Update
               </Button>
            </ButtonControl>
         </GroupControl>
         <DragDropContext onDragEnd={handleDropEnd}>
            <StyledContent>
               {issuesStatus
                  ? issuesStatus.map((status: any) => (
                       <StatusColumn key={status.statusId}>
                          <h3>{status.statusName}</h3>
                          <div>
                             <TaskList
                                taskList={
                                   selectedProject?.lstTask[status.statusId]
                                }
                                // taskNewModalRef={taskNewModalRef}
                             />
                          </div>
                       </StatusColumn>
                    ))
                  : null}
            </StyledContent>
         </DragDropContext>
         {/* <TaskDetailModal /> */}
      </div>
   );
};

export default KanbanBoard;
