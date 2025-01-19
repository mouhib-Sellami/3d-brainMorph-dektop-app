import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { ActionIcon, Badge, Center, useMantineTheme } from "@mantine/core";
import { DataTableActions } from "@renderer/components/app-datatable/types";
import { User } from "@renderer/types/User";

const UserDataTableConfig = (props: DataTableActions<User>) => {
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
            render: (record: User) => {
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
                accessor: 'user.id', title: "#", width: '5%', textAlign: 'center',
            },
            {
                accessor: 'first_name', title: "First name", width: '20%', textAlign: 'center',
            },
            {
                accessor: 'last_name', title: "Last name", width: '20%', textAlign: 'center',
            },
            {
                accessor: 'email', title: "Email", width: '30 % ', textAlign: 'center',
            },
            {
                accessor: 'role.name', title: "Role", width: '10%', textAlign: 'center',
            },
            {
                accessor: 'active', title: "Active", width: '10%', textAlign: 'center',
                render: (record: any) => (
                    <Badge color={record.is_active ? 'green' : 'red'}>
                        {record.is_active ? 'Active' : 'deactivated'}
                    </Badge>
                )
            },
        ]
    }, [props])

    const COLUMNS = React.useMemo(() => {
        if (ACTIONS && ACTIONS.length > 0) {
            const actions = generateActions();
            if (actions)
                BASE_COLUMNS.push(actions as DataTableColumn<Partial<User>>)
        }
        return BASE_COLUMNS
    }, [props, ACTIONS, BASE_COLUMNS])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}



export default UserDataTableConfig;