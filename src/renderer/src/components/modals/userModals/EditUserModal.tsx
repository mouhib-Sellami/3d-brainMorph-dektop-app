import { onError } from "@/redux/slices/errorSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useRoles from "@renderer/hooks/useRoles";
import { getRoles } from "@renderer/redux/slices/roleSlice";
import { updateUser } from "@renderer/redux/slices/userSlice";
import { User } from "@renderer/types/User";
import React from "react";


export interface EditUserModalProps extends BaseModalProps {
    onUpdate: () => void,
    user: User
}

const EditUserModal: React.FC<EditUserModalProps> = (props) => {
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

    const onSubmit = React.useCallback(async (values) => {
        console.log(values);
        
        if (props.user) {
            const res = await dispatch(updateUser({ id: props.user.id, ...values }))
            if (res?.type == "users/updateUser/rejected") {
                setTimeout(() => dispatch(onError({
                    content: "Email or Username already in use ! ",
                    level: "WARNING",
                    render: "NOTIFICATION",
                    type: "user creation"
                })), 500)
            } else {
                props.onUpdate()
            }
        }
    }, [props.user])


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
                    {...form.getInputProps('username')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="First name"
                    placeholder="john"
                    disabled={true}
                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="Last name"
                    placeholder="doe"
                    disabled={true}
                    {...form.getInputProps('last_name')}
                />
                <TextInput
                    withAsterisk
                    readOnly
                    label="email"
                    disabled={true}
                    placeholder="john.doe@example.com"
                    {...form.getInputProps('email')}
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
