import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import ProjectManagement from "../pages/ProjectManagement";
import Entry from "../pages/Entry";
import Mywork from "../pages/Mywork";
import KanbanBoard from "../pages/KanbanBoard/KanbanBoard";
import ProjectSetting from "../pages/ProjectSetting/";

const UserProtected = lazy(() => import("./UserProtected"));
const Auth = lazy(() => import("../pages/Auth"));
const Signin = lazy(() => import("../pages/Auth/Signin"));
const Signup = lazy(() => import("../pages/Auth/Signup"));
const RootLayout = lazy(() => import("../layouts/"));
const Home = lazy(() => import("../pages/Home"));
const ProjectLayout = lazy(() => import("../layouts/components/ProjectLayout"));

const routes = createBrowserRouter([
   // Authenication
   {
      path: "",
      element: <Auth />,
      children: [
         { path: "/signin", element: <Signin /> },
         {
            path: "/signup",
            element: <Signup />,
         },
      ],
   },
   {
      path: "/",
      element: (
         <UserProtected>
            <RootLayout />
         </UserProtected>
      ),
      children: [
         {
            index: true,
            element: <Home />,
         },
         { path: "/mywork", element: <Mywork /> },
         {
            path: "/projects",
            element: <ProjectManagement />,
         },
      ],
   },
   {
      path: "/projects/:projectId",
      element: <ProjectLayout />,
      children: [
         { index: true, element: <Entry /> },
         { path: "board", element: <KanbanBoard /> },
         {
            path: "settings",
            element: <ProjectSetting />,
         },
      ],
   },
   {
      path: "/githubrepo",
      element: <External />,
   },
]);

function External() {
   window.location.href = "https://github.com/TienLuu";
   return null;
}

export default routes;
