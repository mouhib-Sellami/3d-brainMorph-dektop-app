import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import { onError } from "@/redux/slices/errorSlice";
import { createProject, updateProject } from "@/redux/slices/projectSlice";
import { getUsers } from "@/redux/slices/userSlice";
import { dispatch } from "@/redux/store";
import { Project } from "@/types/Project";
import { Button, Group, Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface EditProjectModalProps extends BaseModalProps {
    project: Project,
    onUpdate: () => void
}

const EditProjectModal: React.FC<EditProjectModalProps> = (props) => {
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
        if (organization && props.project)
            return {
                id: props.project.id,
                organization: organization.id,
                name: props.project.name,
                description: props.project.description,
                members: props.project.members.map(elm => elm.id?.toString()),
                updated_at: props.project.updated_at.toString(),
                created_at: props.project.created_at.toString()
            }
    }, [organization, props.project])

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
        const res = await dispatch(updateProject(values))
        if (res?.type == "projects/updateProject/rejected") {
            setTimeout(()=>dispatch(onError({
                content: "Cannot update project , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })),500)
        } else {
            props.onUpdate()
        }
    }, [])
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
             <Title style={{ textAlign: "center" }} order={3}>Edit Project</Title>
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

export default EditProjectModal;
