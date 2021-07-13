import {
  BOARD_ROUTE,
  BOARDS_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
} from "./utils/consts";
import { RouteType } from "./types/routesType";
import LoginPage from "./pages/Login/LoginPage";
import RegistrationPage from "./pages/Registration/RegistrationPage";
import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";
import MainPage from "./pages/Main/MainPage";

export const publicRoutes: RouteType[] = [
  {
    path: LOGIN_ROUTE,
    component: LoginPage,
  },
  {
    path: REGISTRATION_ROUTE,
    component: RegistrationPage,
  },
  {
    path: MAIN_ROUTE,
    component: MainPage,
  },
];

export const privateRoutes: RouteType[] = [
  {
    path: BOARD_ROUTE,
    component: BoardPage,
  },
  {
    path: BOARDS_ROUTE,
    component: BoardsPage,
  },
];
