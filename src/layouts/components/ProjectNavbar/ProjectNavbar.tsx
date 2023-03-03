import { useRef } from "react";

import Icon from "../../../components/Icon";
// import TaskNewModal from "./TaskNewModal";
import {
   NavLeft,
   LogoLink,
   StyledLogo,
   Bottom,
   Item,
   ItemText,
} from "./Styles";

const ProjectNavbar = () => {
   const TaskNewModalRef = useRef<any>();

   const handleToggleModal = () => {
      TaskNewModalRef.current.toggleModal(true);
   };

   return (
      <NavLeft>
         <LogoLink to="/">
            <StyledLogo />
         </LogoLink>

         <Item>
            <Icon color="" type="search" size={22} top={1} left={3} />
            <ItemText>Search issues</ItemText>
         </Item>

         <Item onClick={handleToggleModal}>
            <Icon color="" type="plus" size={27} />
            <ItemText>Create Issue</ItemText>
         </Item>

         <Bottom>
            <Item>
               <Icon color="" type="help" size={27} />
               <ItemText>About</ItemText>
            </Item>
         </Bottom>
         {/* <TaskNewModal ref={TaskNewModalRef} /> */}
      </NavLeft>
   );
};

export default ProjectNavbar;
