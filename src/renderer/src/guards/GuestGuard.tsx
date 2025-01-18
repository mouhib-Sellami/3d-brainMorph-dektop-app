import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
import { PATH_APP } from '../routes/paths';
// routes

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default function GuestGuard(props: React.PropsWithChildren) {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={PATH_APP.general.dashboard} />
    }

    return <>{props.children}</>;
}
