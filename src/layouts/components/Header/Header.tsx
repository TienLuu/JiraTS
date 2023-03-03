import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../../../components/SVG/Logo";
import Button from "../../../components/Button";
import MoreMenu from "../../../components/MoreMenu";
import Avatar from "../../../components/Avatar";

import { logout } from "../../../redux/slices/authSlice";
import { IMenuUser, menuUser } from "./header-config";
import {
   Container,
   Navigation,
   MoreInfo,
   StyledLogo,
   NavItem,
   Nav,
} from "./Styled";
import { RootState } from "../../../store";

interface IProps {
   height: string;
}

const Header = ({ height }: IProps) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useSelector((state: RootState) => state.auth);

   const handleSelectOption = (item: IMenuUser) => {
      if (item.action === "signout") {
         dispatch(logout({}));
         navigate(`/signin`);
         return;
      }
   };

   return (
      <Container height={height}>
         <StyledLogo onClick={() => navigate("/")}>
            <Logo id="header" light />
         </StyledLogo>
         <Navigation className="navigation">
            <Nav>
               <NavItem>
                  <NavLink
                     to="/mywork"
                     className={({ isActive }) => `${isActive ? "active" : ""}`}
                  >
                     My Works
                  </NavLink>
               </NavItem>
               <NavItem>
                  <NavLink
                     to="/projects"
                     className={({ isActive }) => `${isActive ? "active" : ""}`}
                  >
                     Projects
                  </NavLink>
               </NavItem>
            </Nav>
         </Navigation>
         <MoreInfo>
            <NavLink to="/githubrepo" target="_blank">
               <Button className="" variant="secondary" icon1="github">
                  Github Repo
               </Button>
            </NavLink>
            <MoreMenu
               placement="bottom"
               rootActiveClass=""
               trigger="click"
               items={menuUser}
               onChange={handleSelectOption}
            >
               <div className="avatarWrapper">
                  <Avatar
                     alt=""
                     className="userIcon"
                     name={user.name}
                     size={32}
                     square={false}
                     avatarUrl={user.avatar}
                  />
               </div>
            </MoreMenu>
         </MoreInfo>
      </Container>
   );
};

export default Header;
