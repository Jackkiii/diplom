import Admin from "./pages/Admin";
import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    PERSONALCABINET_ROUTE,
    PUBLICATIONLIST_ROUTE,
    REGISTRATION_ROUTE
} from "./utils/consts";
import Auth from "./pages/Auth";
import PersonalCabinet from "./pages/PersonalCabinet";
import PublicationList from "./pages/PublicationList";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

    {
        path: PERSONALCABINET_ROUTE,
        Component: PersonalCabinet
    },

    {
        path: PUBLICATIONLIST_ROUTE,
        Component: PublicationList
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]

