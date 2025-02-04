import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Badge, Center, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "@renderer/components/app-datatable/types";
import { Task } from "@renderer/types/Task";
import useTasksGroup from "@renderer/hooks/useTasksGroup";
import moment from 'moment';

const TaskDataTableConfig = (props: DataTableActions<Task>) => {
    const { colors } = useMantineTheme();
    const { convertTimeToSeconds } = useTasksGroup();
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
            render: (record: Task) => {
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
                accessor: 'job_payload.patient.folder_name', title: "Patient assets", textAlign: 'center', width: '35%'
            },
            {
                accessor: 'execution_time', title: "Execution time", textAlign: 'center', width: '5%', render(task: any) {
                    return (
                        <Badge variant="light">{convertTimeToSeconds(task.execution_time)} s</Badge>
                    )
                }
            },
            {
                accessor: 'executed_at', title: "Start date", textAlign: 'center', width: '20%', render(task: any) {
                    return (
                        <Badge variant="outline">
                            {

                                moment(task.executed_at).format('YYYY-MM-DD HH:mm:ss')
                            }
                        </Badge>
                    )
                }
            },
            {
                accessor: 'task_type', title: "Job name", textAlign: 'center', width: '10%'
            },
            {
                accessor: 'attempts', title: "Attempts", textAlign: 'center', width: '10%'
            },
            {
                accessor: 'status', title: "Status", textAlign: 'center', width: '10%',
                render: (task: any) => (
                    <Badge >
                        {task.status}
                    </Badge>
                )
            },
        ]
    }, [props])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions();
            if (actions)
                BASE_COLUMNS.push(actions as DataTableColumn<Partial<Task>>)
        }
        return BASE_COLUMNS
    }, [props, ACTIONS, BASE_COLUMNS])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}



export default TaskDataTableConfig;