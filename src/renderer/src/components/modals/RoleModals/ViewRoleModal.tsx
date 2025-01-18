import { dispatch } from "@/redux/store";
import { Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import useAppPermissions from "@renderer/hooks/useAppPermissions";
import { getAppPermissions } from "@renderer/redux/slices/permissionSlice";
import React from "react";

export interface ViewRoleModalProps extends BaseModalProps {
    role: Role
}

const ViewRoleModal: React.FC<ViewRoleModalProps> = (props) => {
    const { permissions } = useAppPermissions();

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
        if (props.role)
            return {
                name: props.role.name,
                slug: props.role.slug,
                permissions: props.role.permissions.map(elm => elm.id?.toString())
            }
        return {}
    }, [ props.role])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            name: (value) => (value.length == 0
                ? 'name is required!' : null),
            permissions: (value) => (value.length == 0 ? "Select permissions" : null)
        },
    });
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Role</Title>
            <form>
                <TextInput
                    readOnly
                    disabled={true}
                    label="Name"
                    placeholder="Role name"
                    autoFocus

                    {...form.getInputProps('name')}
                />
                <TextInput
                    readOnly
                    disabled={true}
                    label="Slug"
                    placeholder=""
                    {...form.getInputProps('slug')}
                />
                <MultiSelect
                    readOnly
                    disabled={true}
                    label="Permissions"
                    data={permissionsOptions}
                    {...form.getInputProps('permissions')}
                />

            </form>
        </Modal>
    )
}

export default ViewRoleModal;
