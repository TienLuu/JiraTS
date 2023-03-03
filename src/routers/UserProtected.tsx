import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { RootState } from "../store";

interface IProps {
   children: ReactElement;
}

const UserProtected = ({ children }: IProps) => {
   const { user } = useSelector((state: RootState) => state.auth);
   const location = useLocation();

   if (!user?.email) {
      const url = `/signin?redirectUrl=${location.pathname}`;
      return <Navigate to={url} replace />;
   }
   return children;
};

export default UserProtected;
