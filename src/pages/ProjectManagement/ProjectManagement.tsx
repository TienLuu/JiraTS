import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarGroup from "@mui/material/AvatarGroup";

import MoreMenu from "../../components/MoreMenu";
import TableData from "../../components/TableData";
import Icon from "../../components/Icon";
import Avatar from "../../components/Avatar";
import NewProjectForm from "./NewProjectForm";
import MenuSelect from "../../components/MenuSelect";

import useRequest from "../../hooks1/useRequest";
import { getProjects } from "../../redux/slices/projectSlice";
import projectAPI from "../../services/projectAPI";
import { RootState, useAppDispatch } from "../../store";

import { showError, showSuccess } from "../../utils/toast";
import { Wrapper, Title, Container, StyledMenuItem } from "./Styles";
import { IUserInfos } from "../../type/user.interface";

const UserManagement = () => {
   const { projects, loading, error } = useSelector(
      (state: RootState) => state.project
   );
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

   const [searchParams, setSearchParams] = useSearchParams();
   const searchValue = searchParams.get("keyword") || "";

   const deleteProject = useRequest(projectAPI.deleteProject, { manual: true });

   const getProjectList = () => {
      dispatch(getProjects(searchValue));
   };

   useEffect(() => {
      getProjectList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleCreateSuccess = () => {
      getProjectList();
   };

   const handleSelect = (action: string, id: any) => {
      if (action === "detail") {
         navigate(`/projects/${id}/board`);
         return;
      }

      if (action === "setting") {
         navigate(`/projects/${id}/settings`);
      }

      if (action === "delete") {
         deleteProject
            .runAsync(id)
            .then(() => {
               showSuccess("Delete project successfull");
               dispatch(getProjects(searchValue));
            })
            .catch((error) => {
               showError(error);
            });
         return;
      }
   };

   const handleSelectUser = (item: any, method: object) => {};

   const actions: { [key: string]: any } | any = [
      {
         title: "Detail",
         icon: <Icon color="" type="board" />,
         action: "detail",
      },
      {
         title: "Setting",
         icon: <Icon color="" type="settings" />,
         action: "setting",
      },
      {
         title: "Delete",
         icon: <Icon color="" type="trash" />,
         action: "delete",
      },
   ];

   const columns = [
      {
         field: "projectName",
         headerName: "Name",
         flex: 3,
         minWidth: 200,
      },
      {
         field: "categoryName",
         headerName: "Category",
         flex: 2,
         minWidth: 150,
      },
      {
         field: "creator",
         headerName: "Creator",
         flex: 2,
         minWidth: 150,
         renderCell: (params: any) => params.value.name,
      },
      {
         field: "members",
         headerName: "Member",
         flex: 2,
         minWidth: 150,
         renderCell: (params: any) => {
            return (
               <MenuSelect
                  placement="bottom"
                  hideOnSelect={true}
                  items={params.value}
                  maxRender={3}
                  stepRender={2}
                  renderItem={(item: IUserInfos) => (
                     <StyledMenuItem>
                        <Avatar
                           square={false}
                           name=""
                           className=""
                           alt=""
                           avatarUrl={item.avatar}
                           size={24}
                        />
                        <span>{item.name}</span>
                        {item.userId === params.row.creator.id
                           ? " ✨Creator"
                           : null}
                     </StyledMenuItem>
                  )}
                  getSearchKey={(item) => item.name}
                  getItemsKey={(item) => item.userId}
                  rootClass="memberWrapper"
                  onChange={(item, method) => handleSelectUser(item, method)}
                  defaultPlaceHolder={
                     <AvatarGroup
                        max={4}
                        total={params.value.lenght}
                        sx={{
                           "& .MuiAvatar-root": {
                              width: 22,
                              height: 22,
                              fontSize: 12,
                              lineHeight: "22px",
                           },
                        }}
                        className="styledGroup"
                     >
                        {params.value?.map((item: any) => (
                           <Avatar
                              name=""
                              square={false}
                              key={item.userId}
                              className="memberAvatar"
                              avatarUrl={item?.avatar}
                              size={26}
                              alt={item?.name}
                           />
                        ))}
                     </AvatarGroup>
                  }
               />
            );
         },
      },
      {
         field: "action",
         headerName: "More",
         description: "Do more action with this",
         sortable: false,
         flex: 1,
         minWidth: 80,
         renderCell: (params: any) => {
            return (
               <MoreMenu
                  trigger="click"
                  rootActiveClass=""
                  items={[...actions]}
                  placement="bottom-end"
                  onChange={({ action }) => {
                     handleSelect(action, params.row.id);
                  }}
               >
                  <Icon color="" type="more" />
               </MoreMenu>
            );
         },
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
   ];

   return (
      <Wrapper>
         <Title>
            <h2>Projects</h2>
         </Title>
         <Container>
            <TableData
               rows={projects || []}
               columns={columns}
               getRowId={(row: any) => row.id}
               getEstimatedRowHeight={() => 100}
               autoRowHeight
               sx={{
                  "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                     py: "4px",
                  },
                  "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                     py: "4px",
                  },
                  "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                     py: "4px",
                  },
               }}
               loading={loading}
               error={error ? error : null}
            />
         </Container>
         <NewProjectForm onCreateSuccess={handleCreateSuccess} />
      </Wrapper>
   );
};

export default UserManagement;
