import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";

import ProjectSidebar from "../ProjectSideBar";
import ProjectNavbar from "../ProjectNavbar";
import Breadcrumbs from "../../../components/Breadcrumbs";

import { getProjectDetail } from "../../../redux/slices/projectSlice";
import {
   Wrapper,
   Navigation,
   Main,
   StyledBreadcrumbs,
   StyledContent,
   WrapperContent,
} from "./Styles";
import { useAppDispatch } from "../../../store";

const ProjectLayout = () => {
   const { projectId } = useParams();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getProjectDetail(projectId));
   }, [projectId]);

   return (
      <Wrapper>
         <Navigation>
            <ProjectNavbar />
            <ProjectSidebar />
         </Navigation>
         <Main>
            <StyledBreadcrumbs>
               <Breadcrumbs />
            </StyledBreadcrumbs>
            <WrapperContent>
               <StyledContent>
                  <Outlet />
               </StyledContent>
            </WrapperContent>
         </Main>
         <ToastContainer transition={Slide} />
      </Wrapper>
   );
};

export default ProjectLayout;
