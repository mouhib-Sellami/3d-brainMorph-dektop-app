import { onError } from "@/redux/slices/errorSlice";
import { dispatch } from "@/redux/store";
import { Button, Group, Modal, NumberInput, Select, TextInput, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { createPatients } from "@renderer/redux/slices/patientSlice";
import { Patient } from "@renderer/types/Patient";
import React from "react";

export interface AddPatientModalProps extends BaseModalProps {
    onAdd: () => void
}

const AddPatientModal: React.FC<AddPatientModalProps> = (props) => {

    const initialValues = React.useMemo(() => {
        return {
            first_name: "",
            last_name: "",
            age: 0,
            birth_date: "",
            gender: "Male"
        }
    }, [])

    const form = useForm({
        mode: 'controlled',
        initialValues: initialValues,
        validate: {
            first_name: (value) => (value.length == 0
                ? 'First name is required!' : null),
            last_name: (value) => (value.length == 0
                ? 'Last name is required!' : null),
            age: (value) => (value == 0
                ? 'Age is invalude!' : null),
            birth_date: (value) => (value.length == 0
                ? 'Birth date is required!' : null),
            gender: (value) => (value.length == 0
                ? 'Gender date is required!' : null),
        },
    });

    const onSubmit = React.useCallback(async (values: Patient) => {
        const dateObj = new Date(values.birth_date);

        const formattedDate = dateObj.toISOString().slice(0, 10);

        const res = await dispatch(createPatients({ ...values, birth_date: formattedDate }))
        if (res.meta.requestStatus == "rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot create patient , try again later! ",
                level: "WARNING",
                render: "NOTIFICATION",
                type: "user creation"
            })), 500)
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
            <Title style={{ textAlign: "center" }} order={3}>Add new Patient</Title>
            <form onSubmit={form.onSubmit((values) => onSubmit(values as Patient))}>
                <TextInput
                    withAsterisk
                    label="First name"
                    placeholder="John"
                    autoFocus
                    required
                    {...form.getInputProps('first_name')}
                />
                <TextInput
                    withAsterisk
                    label="Last name"
                    placeholder="doe"
                    required
                    {...form.getInputProps('last_name')}
                />
                <NumberInput
                    withAsterisk
                    label="Age"
                    placeholder="23"
                    required
                    {...form.getInputProps('age')}
                />
                <DateInput
                    withAsterisk
                    label="Age"
                    required
                    valueFormat="YYYY-MM-DD"
                    placeholder="01/01/1990"
                    {...form.getInputProps('birth_date')}
                />
                <Select
                    label="Gender"
                    data={['Male', 'Female']}
                    required
                    withAsterisk
                    {...form.getInputProps('gender')}
                />
                <Group justify="center" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Modal>
    )
}

export default AddPatientModal;
