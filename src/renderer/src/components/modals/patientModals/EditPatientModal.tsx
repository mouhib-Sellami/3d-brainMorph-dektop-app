import { onError } from "@/redux/slices/errorSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { updatePatient } from "@renderer/redux/slices/patientSlice";
import { Patient } from "@renderer/types/Patient";
import React from "react";

export interface EditPatientModalProps extends BaseModalProps {
    patient: Patient,
    onUpdate: () => void
}

const EditPatientModal: React.FC<EditPatientModalProps> = (props) => {

    const initialValues = React.useMemo(() => {
        if (props.patient)
            return {
                id: props.patient?.id || 0,
                first_name: props.patient.first_name,
                last_name: props.patient.first_name,
            }
        return {}
    }, [props.patient])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            first_name: (value) => (value.length == 0
                ? 'name is required!' : null),
            last_name: (value) => (value.length == 0
                ? 'name is required!' : null),
        },
    });

    const onSubmit = React.useCallback(async (values) => {
        const res = await dispatch(updatePatient(values))
        if (res.meta.requestStatus == "rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot update patient , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })), 500)
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
            <Title style={{ textAlign: "center" }} order={3}>Edit Patient</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                <TextInput
                    withAsterisk
                    label="First name"
                    placeholder="John"
                    autoFocus

                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    label="Last name"
                    placeholder="doe"
                    autoFocus

                    {...form.getInputProps('last_name')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default EditPatientModal;
