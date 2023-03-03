import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { ProjectLogo } from "../../../components/SVG/SVG";
import Icon from "../../../components/Icon";

import useToggle from "../../../hooks1/useToggle";
import { ProjectCategoryCopy } from "../../..//constants/projects";
import {
   Sidebar,
   ProjectInfo,
   ProjectTexts,
   ProjectName,
   ProjectCategory,
   Divider,
   LinkItem,
   LinkText,
   NotImplemented,
   ResizeControl,
   StyledIcon,
   StyledLine,
   Navigate,
   Container,
} from "./Styles";
import { RootState } from "../../../store";

const ProjectSidebar = () => {
   const { selectedProject } = useSelector((state: RootState) => state.project);

   const [expand, toggleExpand] = useToggle(() => {
      if (window.innerWidth < 768) {
         return false;
      }
      return true;
   });

   return (
      <Sidebar className={`${expand ? "expand" : ""}`}>
         <Container>
            <ProjectInfo className="project">
               <ProjectLogo />
               <ProjectTexts>
                  <ProjectName>{selectedProject?.alias}</ProjectName>
                  <ProjectCategory>
                     {
                        ProjectCategoryCopy[
                           selectedProject?.projectCategory.name
                        ]
                     }{" "}
                     project
                  </ProjectCategory>
               </ProjectTexts>
            </ProjectInfo>
            <Navigate className="navigate">
               {renderLinkItem(
                  "Kanban Board",
                  "board",
                  "/board",
                  selectedProject?.id
               )}
               {renderLinkItem(
                  "Project settings",
                  "settings",
                  "/settings",
                  selectedProject?.id
               )}
               <Divider />
               {renderLinkItem("Releases", "shipping", "", null)}
               {renderLinkItem("Issues and filters", "issues", "", null)}
               {renderLinkItem("Pages", "page", "", null)}
               {renderLinkItem("Reports", "reports", "", null)}
               {renderLinkItem("Components", "component", "", null)}
            </Navigate>
         </Container>
         <ResizeControl>
            <StyledIcon onClick={toggleExpand} className="toggleBtn">
               <Icon color="" type="chevron-left" size={20} />
            </StyledIcon>
            <StyledLine className="boundaryLine"></StyledLine>
         </ResizeControl>
      </Sidebar>
   );
};

const renderLinkItem = (
   text: string,
   iconType: string,
   path: string,
   id: number | null
) => {
   const isImplemented = !!path;

   if (isImplemented) {
      return (
         <LinkItem to={`/projects/${id}${path}`} as={NavLink}>
            <Icon color="" type={iconType} />
            <LinkText>{text}</LinkText>
            {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
         </LinkItem>
      );
   }
   return (
      <LinkItem to={path} as={"div"}>
         <Icon color="" type={iconType} />
         <LinkText>{text}</LinkText>
         {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
      </LinkItem>
   );
};

export default ProjectSidebar;
