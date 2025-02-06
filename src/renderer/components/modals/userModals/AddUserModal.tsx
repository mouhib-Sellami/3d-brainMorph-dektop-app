import { onError } from "@/redux/slices/errorSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useRoles from "@renderer/hooks/useRoles";
import { getRoles } from "@renderer/redux/slices/roleSlice";
import { createUser } from "@renderer/redux/slices/userSlice";
import React from "react";


export interface AddUserModalProps extends BaseModalProps {
    onAdd: () => void
}

const AddUserModal: React.FC<AddUserModalProps> = (props) => {
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

            username: "",
            first_name: "",
            last_name: "",
            email: "",
            role: "0",
        }

    }, [])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            username: (value) => (value.length == 0
                ? 'Username is required!' : null),
            first_name: (value) => (value.length == 0
                ? 'First name is required!' : null),
            last_name: (value) => (value.length == 0
                ? 'Last name is required!' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null :
                'Email is required!'),
            role: (value) => value == "" || value == "0" ? "Role need to be specified" : null
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(createUser(values))

        if (res?.type == "users/createUser/rejected") {
            setTimeout(() => dispatch(onError({
                content: "Email or Username already in use ! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })), 500)
        } else {
            props.onAdd()

        }
    }, [])

    return (
        <Modal
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            size={"xl"}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Add new member</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Username"
                    placeholder="john.doe"
                    autoFocus
                    {...form.getInputProps('username')}
                />
                <TextInput
                    withAsterisk
                    label="First name"
                    placeholder="john"
                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    label="Last name"
                    placeholder="doe"
                    {...form.getInputProps('last_name')}
                />
                <TextInput
                    withAsterisk
                    label="email"
                    placeholder="john.doe@example.com"
                    {...form.getInputProps('email')}
                />
                <Select label="Role" placeholder="User | Admin ..."
                    data={RoleOptions}
                    {...form.getInputProps('role')} />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default AddUserModal;
