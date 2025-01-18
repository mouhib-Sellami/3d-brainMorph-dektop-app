import {
    IconHospital,
    IconLayoutDashboard,
    IconSettings,
    IconUsers,
    IconUserShield,
} from "@tabler/icons-react";
import { PATH_APP } from "@/routes/paths";
import { NavItem } from "./types";

export const navLinks: NavItem[] = [
    {
        label: "Dashboard",
        icon: IconLayoutDashboard,
        link: PATH_APP.general.dashboard,
        name: "Dashboard",
        isVisible: true,
    },
    {
        label: "Users",
        icon: IconUsers,
        link: PATH_APP.general.dashboard,
        name: "Users",
        isVisible: true,
    },
    {
        label: "Role",
        icon: IconUserShield,
        link: PATH_APP.general.roles,
        name: "Role",
        isVisible: true,
    },
    {
        label: "Patients",
        icon: IconHospital,
        link: PATH_APP.general.dashboard,
        name: "Patients",
        isVisible: true,
    },
    {
        label: "Settings",
        icon: IconSettings,
        link: PATH_APP.general.dashboard,
        name: "Settings",
        isVisible: false,
    },

];
