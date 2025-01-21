import { Card, TextInput } from "@mantine/core";
import { Patient } from "@renderer/types/Patient";
import React from "react";
import { DateInput } from '@mantine/dates';

export interface PatientCardProps {
    patient: Patient
}
const PatientCard: React.FC<PatientCardProps> = (props) => {

    const PATIENT = React.useMemo(() => {
        return props.patient
    }, [props.patient])

    return (
        <Card color="darkGray">
            <TextInput
                label="First name"
                readOnly
                value={PATIENT.first_name}
            />
            <TextInput
                label="Last name"
                readOnly
                value={PATIENT.last_name}
            />
            <TextInput
                label="Gender"
                readOnly
                value={PATIENT.gender}
            />
            <DateInput
                label="Birth date"
                readOnly
                valueFormat="YYYY MMM DD"
                value={new Date(PATIENT.birth_date)}
            />
            <TextInput
                label="Age"
                readOnly
                value={PATIENT.age}
            />
            <TextInput
                label="Patient folder"
                readOnly
                disabled
                value={PATIENT.folder_name}
            />
        </Card>
    )
}

export default PatientCard;