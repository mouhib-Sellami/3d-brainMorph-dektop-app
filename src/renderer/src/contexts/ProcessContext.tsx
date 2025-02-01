import React from "react";
import { notifications } from "@mantine/notifications";
import { useSocketSubscribe } from "@renderer/hooks/useSocketSubscribe";
import { RouteProps } from "react-router-dom";

type ProcessContextProps = {

}

const ProcessContext = React.createContext<Partial<ProcessContextProps>>({})

const ProcessProvider = (props: RouteProps) => {

    useSocketSubscribe('patient_complete', async (data) => {
        const patientData = JSON.parse(data)
        notifications.show({
            title: 'Patient Complete',
            message: 'Process Completed with success for patient ' + patientData.first_name + " " + patientData.last_name + ' 🌟',
        })
    })

    return (
        <ProcessContext.Provider value={{}}>
            {props.children}
        </ProcessContext.Provider>
    )
};
const ProcessConsumer = ProcessContext.Consumer
export { ProcessContext, ProcessProvider, ProcessConsumer };