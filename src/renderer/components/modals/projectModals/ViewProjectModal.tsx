import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import { onError } from "@/redux/slices/errorSlice";
import { createProject } from "@/redux/slices/projectSlice";
import { getUsers } from "@/redux/slices/userSlice";
import { dispatch } from "@/redux/store";
import { Project } from "@/types/Project";
import { Button, Group, Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface ViewProjectModalProps extends BaseModalProps {
    project: Project
}

const ViewProjectModal: React.FC<ViewProjectModalProps> = (props) => {
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

    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Project</Title>
            <form>
                <TextInput
                    disabled={true} readOnly
                    label="Name"
                    placeholder="Funny times"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    disabled={true} readOnly
                    label="Description"
                    placeholder=""
                    {...form.getInputProps('description')}
                />
                <MultiSelect
                    disabled={true} readOnly
                    label="Members"
                    placeholder="Pick members"
                    data={usersOptions}
                    {...form.getInputProps('members')}
                />
                <TextInput
                    readOnly
                    label="Created at"
                    disabled={true}
                    placeholder="10-10-2000"
                    {...form.getInputProps('created_at')}
                />
                <TextInput
                    readOnly
                    label="Last update"
                    disabled={true}
                    placeholder="10-10-2000"
                    {...form.getInputProps('updated_at')}
                />
            </form>
        </Modal>
    )
}

export default ViewProjectModal;
