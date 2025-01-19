import { dispatch } from "@/redux/store";
import { Modal, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useRoles from "@renderer/hooks/useRoles";
import { getRoles } from "@renderer/redux/slices/roleSlice";
import { User } from "@renderer/types/User";
import React from "react";


export interface ViewUserModalProps extends BaseModalProps {
    user: User
}

const ViewUserModal: React.FC<ViewUserModalProps> = (props) => {
    const { roles } = useRoles();

    const RoleOptions = React.useMemo(() => {
        return roles.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.name }))
    }, [roles])

    const fetchRoles = React.useCallback(async () => {
        await dispatch(getRoles())
    }, [])

    React.useEffect(() => {
        fetchRoles().then().catch()
    }, [])

    const initialValues = React.useMemo(() => {
        return {
            id: props.user.id,
            username: props.user.username,
            first_name: props.user.first_name,
            last_name: props.user.last_name,
            email: props.user.email,
            role: props.user?.role?.id?.toString() || "0",
            created_at: props.user?.created_at || ""
        }
    }, [])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            username: (value) => (value.length == 0
                ? 'Username is required!' : null),
            first_name: (value) => (value?.length == 0
                ? 'First name is required!' : null),
            last_name: (value) => (value?.length == 0
                ? 'Last name is required!' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null :
                'Email is required!'),
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
                    {...form.getInputProps('username')}
                />
                <TextInput

                    readOnly
                    label="First name"
                    placeholder="john"
                    disabled={true}
                    {...form.getInputProps('first_name')}
                />
                <TextInput

                    readOnly
                    label="Last name"
                    placeholder="doe"
                    disabled={true}
                    {...form.getInputProps('last_name')}
                />
                <TextInput

                    readOnly
                    label="email"
                    disabled={true}
                    placeholder="john.doe@example.com"
                    {...form.getInputProps('email')}
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
