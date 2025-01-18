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
                    index: true
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
const RolePage = Loadable(lazy(() => import('@/pages/app/roles/RolePage')));