import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Center, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "@renderer/components/app-datatable/types";
import { Patient } from "@renderer/types/Patient";

const PatientDataTableConfig = (props: DataTableActions<Patient>) => {
    const { colors } = useMantineTheme();
    const PAGE_SIZE = React.useMemo(() => {
        return 25
    }, []);

    const ACTIONS = React.useMemo(() => {
        return props.actions
    }, [props])

    const generateActions = React.useCallback(() => {
        if (!ACTIONS)
            return null;
        return {
            accessor: 'Actions',
            title: "Actions",
            textAlign: 'center',
            width: '15%',
            render: (record: Patient) => {
                return (<Center>
                    {ACTIONS?.map((elm, idx) => {
                        return (
                            <ActionIcon onClick={() => { elm.action(record) }} variant="transparent" key={idx}>
                                <elm.icon color={elm.color || colors.primary[0]}></elm.icon>
                            </ActionIcon>
                        )
                    })}
                </Center>)
            }
        }
    }, [ACTIONS])

    const BASE_COLUMNS: Array<DataTableColumn> = React.useMemo(() => {
        return [
            {
                accessor: 'id', title: "#", width: '5%', textAlign: 'center',
            },
            {
                accessor: 'first_name', title: "First name", textAlign: 'center', width: '20%',
            },
            {
                accessor: 'last_name', title: "Last name", textAlign: 'center', width: '20%',
            },

        ]
    }, [props])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions();
            if (actions)
                BASE_COLUMNS.push(actions as DataTableColumn<Partial<Patient>>)
        }
        return BASE_COLUMNS
    }, [props, ACTIONS, BASE_COLUMNS])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}



export default PatientDataTableConfig;