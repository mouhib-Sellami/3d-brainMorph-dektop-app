import useAppPermissions from "@/hooks/useAppPermissions";
import useAuth from "@/hooks/useAuth";
import useProjectComponents from "@/hooks/useprojectComponents";
import { onError } from "@/redux/slices/errorSlice";
import { createOrgRoles } from "@/redux/slices/orgRoleSlice";
import { getAppPermissions } from "@/redux/slices/permissionSlice";
import { deleteComponent, getProjectComponent, updateComponent } from "@/redux/slices/projectComponentSlice";
import { dispatch } from "@/redux/store";
import { ProjectComponent } from "@/types/ProjectComponent";
import { Box, Button, Card, Group, Modal, MultiSelect, Select, Switch, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { Component } from "react";
import cloneDeep from 'lodash/cloneDeep';


export interface WidgetModalProps extends BaseModalProps {
    onUpdate: () => void,
    id: number,
    project: number,
    data: ProjectComponent,
    components: Array<ProjectComponent>
}

const WidgetModal: React.FC<WidgetModalProps> = (props) => {
    const delete_ = React.useCallback(async () => {
        await dispatch(deleteComponent(props.id))
        await dispatch(getProjectComponent({ project: props.project }))
        props.onUpdate()
    }, [props.id])
    const components = React.useMemo(() => {
        return props.components.filter(elm => elm.id != props.data.id && props.data.dependence_on.includes(elm.id))
    }, [props.components])

    const ProjectComponent = React.useMemo(() => {
        return props.components.filter(elm => elm.id != props.data.id).flatMap(elm => ({ value: elm.id ? elm.id?.toString() : "0", label: elm.component.name+"."+elm.ressource_name }))
    }, [props.components])

    const fieldsConfig = React.useMemo(() => {
        if (props.data) {
            return props.data.config_json
        }
    }, [props.data])

    const componentConfig = React.useMemo(() => {
        if (props.data) {
            return props.data.component.fields
        }
    }, [props.data])

    const initialValues = React.useMemo(() => {
        const config = cloneDeep(fieldsConfig)
        if (fieldsConfig) {
            return Object.assign({
                ressource_name: props.data.ressource_name,
                dependence_on: components
            }, config)
        }
        return {
            ressource_name: props.data.ressource_name,
        }
    }, [fieldsConfig, components])



    const form = useForm({
        mode: 'controlled',
        initialValues,
        validate: {
            ressource_name: (value) => (value.length == 0
                ? 'name is required!' : null),

        },
    });
    const genFields = React.useCallback((fields, object_name?: string) => {
        if (fields)
            return fields.map((elm, idx) => {
                let field_value = elm.label
                if (object_name) {
                    field_value = object_name + "." + elm.label
                }
                if (elm.type == "TEXT") {
                    return (
                        <TextInput
                            style={{ marginTop: "5px" }}
                            withAsterisk={elm.is_required}
                            label={elm.label}
                            placeholder=""

                            key={idx}
                            {...form.getInputProps(field_value)}
                        />
                    )
                }
                if (elm.type == "BOOLEAN") {
                    return (
                        <Switch
                            style={{ marginTop: "5px" }}
                            label={elm.label}
                            placeholder=""

                            key={idx}
                            {...form.getInputProps(field_value)}
                        />
                    )
                }
                if (elm.type == "INTEGER") {
                    return (
                        <TextInput
                            style={{ marginTop: "5px" }}
                            withAsterisk={elm.is_required}
                            label={elm.label}
                            placeholder=""
                            key={form.key(field_value)}
                            readOnly={false}
                            {...form.getInputProps(field_value)}
                        />
                    )
                }
                if (elm.type == "OBJECT") {
                    return (<Card p={"md"} mt={"5px"} withBorder>
                        <Text>{elm.label}</Text>
                        {genFields(elm.options, elm.label)}
                    </Card>)
                }
            })
        return <></>
    }, [])

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(updateComponent({ id: props.data.id, config_json: values,ressource_name:values.ressource_name,dependence_on:values.dependence_on }as ProjectComponent))
        if (res?.type == "component/updateComponent/rejected") {
           setTimeout(()=> dispatch(onError({
                content: "Cannot update component , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })),500)
        } else {
            props.onUpdate()

        }
    }, [form.values])

    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Edit</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="Ressource name"
                    placeholder=""
                    autoFocus

                    {...form.getInputProps('ressource_name')}
                />
                {genFields(componentConfig)}
                <MultiSelect
                    label="Dependence on"
                    placeholder="Pick value"
                    data={ProjectComponent}
                    {...form.getInputProps('dependence_on')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                    <Button type="button" color="red" onClick={delete_}>Delete</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default WidgetModal;
