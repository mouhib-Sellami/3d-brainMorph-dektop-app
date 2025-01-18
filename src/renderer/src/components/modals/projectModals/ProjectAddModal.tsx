import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import { onError } from "@/redux/slices/errorSlice";
import { createProject } from "@/redux/slices/projectSlice";
import { getUsers } from "@/redux/slices/userSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface ProjectAddModalProps extends BaseModalProps {
    onAdd: () => void
}

const ProjectAddModal: React.FC<ProjectAddModalProps> = (props) => {
    const { users } = useUsers();
    const { organization } = useAuth();
    
    const usersOptions = React.useMemo(() => {
        return users.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.user.username }))
    }, [users])

    const fetchUsers = React.useCallback(async () => {
        await dispatch(getUsers())
    }, [])

    React.useEffect(() => {
        fetchUsers().then().catch()
    }, [])

    const initialValues = React.useMemo(() => {
        if (organization)
            return {
                organization: organization.id,
                name: "",
                description: "",
                members: []
            }
    }, [organization])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            name: (value) => (value.length == 0
                ? 'name is required!' : null),
            // members: (value) => (value.length == 0 ? "Select Members" : null)
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(createProject(values))
        if (res?.type == "projects/createProject/rejected") {
            setTimeout(()=>dispatch(onError({
                content: "Cannot create project , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })),500)
        } else {
            props.onAdd()
        }
    }, [])

    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Add new Project</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Funny times"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput

                    label="Description"
                    placeholder=""
                    {...form.getInputProps('description')}
                />
                <MultiSelect
                    label="Members"
                    placeholder="Pick members"
                    data={usersOptions}
                    {...form.getInputProps('members')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default ProjectAddModal;
