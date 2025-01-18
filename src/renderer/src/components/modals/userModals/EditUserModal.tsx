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


export interface EditUserModalProps extends BaseModalProps {
    onUpdate: () => void,
    orgMember: OrgMember
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
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
                    email: props.orgMember.user.email
                },
                role: props.orgMember.role.id?.toString(),
                organization: organization.id
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

    const onSubmit = React.useCallback(async (values) => {
        if (props.orgMember) {
            const res = await dispatch(updateUser({ id: props.orgMember.id, ...values }))
            if (res?.type == "users/updateUser/rejected") {
                setTimeout(()=>dispatch(onError({
                    content: "Email or Username already in use ! ",
                    level: "WARNING",
                    render: "NOTIFICATION",
                    type: "user creation"
                })),500)
            } else {
                props.onUpdate()
            }
        }
    }, [props.orgMember])


    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Edit member</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="john.doe"
                    autoFocus
                    readOnly
                    disabled={true}
                    {...form.getInputProps('user.username')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="First name"
                    placeholder="john"
                    disabled={true}
                    {...form.getInputProps('user.first_name')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="Last name"
                    placeholder="doe"
                    disabled={true}
                    {...form.getInputProps('user.last_name')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="email"
                    disabled={true}
                    placeholder="john.doe@example.com"
                    {...form.getInputProps('user.email')}
                />
                <Select label="Role" placeholder="User | Admin"
                    data={RoleOptions}
                    {...form.getInputProps('role')} />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default EditUserModal;
