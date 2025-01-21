

function path(root: string, sublink: string) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '';
const ROOTS_APP = '';

export const PATH_AUTH = {
    login: path(ROOTS_AUTH, '/login'),
}

export const PATH_APP = {
    root: ROOTS_APP,
    landing: path(ROOTS_APP, '/'),
    general: {
        dashboard: path(ROOTS_APP, '/dashboard'),
        roles: path(ROOTS_APP, '/roles'),
        users: path(ROOTS_APP, '/users'),
        patients: path(ROOTS_APP, '/patients'),
        patientDetails: path(ROOTS_APP, '/patient-details'),
    },
};
