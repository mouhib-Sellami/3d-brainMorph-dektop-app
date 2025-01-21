import React, { lazy, Suspense } from "react";
import CustomLoadingOverlay from "@/components/customLoading/CustomLoadingOverlay";
import { PATH_APP, PATH_AUTH } from "./paths";
import { useRoutes } from "react-router-dom";
import AuthGuard from "@renderer/guards/AuthGuard";
import GuestGuard from "@renderer/guards/GuestGuard";
import { DashboardLayout } from "@renderer/components/layout/DashboardLayout";
import PermissionGuard from "@renderer/guards/PermissionGuard";

const Loadable = (Component: React.FC) => (props: typeof Component.propTypes) => {

    return (
        <Suspense fallback={<CustomLoadingOverlay />}>
            <Component {...props} />
        </Suspense>
    );
};

export default function AppRoutes() {

    return useRoutes([
        {
            path: PATH_APP.landing,
            element: (
                <LandingPage />
            )
        },
        {
            path: PATH_AUTH.login,
            element: (
                <GuestGuard>
                    <LoginPage />
                </GuestGuard>
            )
        },
        {
            path: PATH_APP.root,
            element: (
                <AuthGuard>
                    <DashboardLayout />
                </AuthGuard>
            ), children: [
                {
                    path: PATH_APP.general.dashboard,
                    element: (
                        <DashboardPage />
                    ),
                    index: true
                },
                {
                    path: PATH_APP.general.roles,
                    element: (
                        <PermissionGuard permission="can_view_role">
                            <RolePage />
                        </PermissionGuard>
                    ),
                },
                {
                    path: PATH_APP.general.users,
                    element: (
                        <PermissionGuard permission="can_view_user">
                            <UserPage />
                        </PermissionGuard>
                    ),
                },
                {
                    path: PATH_APP.general.patients,
                    element: (
                        <PermissionGuard permission="can_view_patient">
                            <PatientPage />
                        </PermissionGuard>
                    ),
                },
                {
                    path: PATH_APP.general.patientDetails,
                    element: (
                        <PermissionGuard permission="can_view_patient">
                            <PatientDetailsPage />
                        </PermissionGuard>
                    ),
                }
            ]
        },
        {
            path: "*",
            element: (
                <Page404 />
            )
        }
    ])
};


const Page404 = Loadable(lazy(() => import('@/pages/errors/Page404')));
const LoginPage = Loadable(lazy(() => import('@/pages/auth/LoginPage')));
const DashboardPage = Loadable(lazy(() => import('@/pages/app/DashboardPage')));
const LandingPage = Loadable(lazy(() => import('@/pages/landing/LandingPage')));
const RolePage = Loadable(lazy(() => import('@/pages/app/roles/RolesPage')));
const UserPage = Loadable(lazy(() => import('@/pages/app/users/UsersPage')));
const PatientPage = Loadable(lazy(() => import('@/pages/app/patients/PatientPage')));
const PatientDetailsPage = Loadable(lazy(() => import('@/pages/app/patients/PatientDetailsPage')));