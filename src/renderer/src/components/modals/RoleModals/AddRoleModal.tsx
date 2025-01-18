import useAppPermissions from "@/hooks/useAppPermissions";
import useAuth from "@/hooks/useAuth";
import { onError } from "@/redux/slices/errorSlice";
import { createOrgRoles } from "@/redux/slices/orgRoleSlice";
import { getAppPermissions } from "@/redux/slices/permissionSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, MultiSelect, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";


export interface AddRoleModalProps extends BaseModalProps {
    onAdd: () => void
}

const AddRoleModal: React.FC<AddRoleModalProps> = (props) => {
    const { permissions } = useAppPermissions();
    const { organization } = useAuth();

    const permissionsOptions = React.useMemo(() => {
        return permissions.flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.label }))
    }, [permissions])

    const fetchPermissions = React.useCallback(async () => {
        await dispatch(getAppPermissions())
    }, [])

    React.useEffect(() => {
        fetchPermissions().then().catch()
    }, [])

    const initialValues = React.useMemo(() => {
        if (organization)
            return {
                organization: organization.id,
                name: "",
                slug: "",
                permissions: []
            }
    }, [organization])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            name: (value) => (value.length == 0
                ? 'name is required!' : null),
            permissions: (value) => (value.length == 0 ? "Select permissions" : null)
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(createOrgRoles(values))
        if (res?.type == "roles/createOrgRoles/rejected") {
            setTimeout(()=>dispatch(onError({
                content: "Cannot create role , try again later! ",
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
            <Title style={{ textAlign: "center" }} order={3}>Add new Role</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Role name"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    withAsterisk
                    label="Slug"
                    placeholder=""
                    {...form.getInputProps('slug')}
                />
                <MultiSelect
                    label="Permissions"
                    placeholder="Pick value"
                    data={permissionsOptions}
                    {...form.getInputProps('permissions')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default AddRoleModal;
