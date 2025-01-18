import useAuth from "@/hooks/useAuth";
import useOrgRole from "@/hooks/useOrgRole";
import { onError } from "@/redux/slices/errorSlice";
import { getOrgRoles } from "@/redux/slices/orgRoleSlice";
import { createUser, updateUser } from "@/redux/slices/userSlice";
import { dispatch } from "@/redux/store";
import { OrgMember } from "@/types/User";
import { Button, Group, Modal, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface ViewUserModalProps extends BaseModalProps {
    orgMember: OrgMember
}

const ViewUserModal: React.FC<ViewUserModalProps> = (props) => {
    const { roles } = useOrgRole();
    const { organization } = useAuth();

    const RoleOptions = React.useMemo(() => {
        return roles.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.name }))
    }, [roles])

    const fetchRoles = React.useCallback(async () => {
        await dispatch(getOrgRoles())
    }, [])

    React.useEffect(() => {
        fetchRoles().then().catch()
    }, [])

    const initialValues = React.useMemo(() => {
        if (organization && props.orgMember)
            return {
                user: {
                    id: props.orgMember.user.id,
                    username: props.orgMember.user.username,
                    first_name: props.orgMember.user.first_name,
                    last_name: props.orgMember.user.last_name,
                    email: props.orgMember.user.email,

                },
                role: props.orgMember.role.id?.toString(),
                organization: organization.id,
                created_at: props.orgMember.created_at.toString()
            }
        if (organization)
            return {
                user: {
                    username: "",
                    first_name: "",
                    last_name: "",
                    email: ""
                },
                role: "",
                organization: organization.id
            }
    }, [organization, props.orgMember])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            user: {
                username: (value) => (value.length == 0
                    ? 'Username is required!' : null),
                first_name: (value) => (value?.length == 0
                    ? 'First name is required!' : null),
                last_name: (value) => (value?.length == 0
                    ? 'Last name is required!' : null),
                email: (value) => (/^\S+@\S+$/.test(value) ? null :
                    'Email is required!'),
            },
            role: (value) => value == "" || value == "0" ? "Role need to be specified" : null
        },
    });
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Member</Title>
            <form>
                <TextInput

                    label="Username"
                    placeholder="john.doe"
                    autoFocus
                    readOnly
                    disabled={true}
                    {...form.getInputProps('user.username')}
                />
                <TextInput

                    readOnly
                    label="First name"
                    placeholder="john"
                    disabled={true}
                    {...form.getInputProps('user.first_name')}
                />
                <TextInput

                    readOnly
                    label="Last name"
                    placeholder="doe"
                    disabled={true}
                    {...form.getInputProps('user.last_name')}
                />
                <TextInput

                    readOnly
                    label="email"
                    disabled={true}
                    placeholder="john.doe@example.com"
                    {...form.getInputProps('user.email')}
                />
                <TextInput

                    readOnly
                    label="Joined On"
                    disabled={true}
                    placeholder="10-10-2000"
                    {...form.getInputProps('created_at')}
                />
                <Select label="Role" disabled={true} placeholder="User | Admin"
                    data={RoleOptions}
                    {...form.getInputProps('role')} />

            </form>
        </Modal>
    )
}

export default ViewUserModal;
