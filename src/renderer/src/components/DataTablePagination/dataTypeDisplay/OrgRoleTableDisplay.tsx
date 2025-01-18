import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { Badge, Group } from '@mantine/core';
import OrgRoleActionTable from "../TableActions/OrgRoleActionTable";


const OrgRoleTableDisplay = (props: DataTableActions<Role>) => {

    const PAGE_SIZE = React.useMemo(() => {
        return 25
    }, []);

    const COLUMNS: Array<DataTableColumn<Role>> = React.useMemo(() => {
        return [
            {
                accessor: 'id', title: "#", width: '5%', textAlign: 'center',
            },
            {
                accessor: 'name', title: "Name", textAlign: 'center', width: '10%'
            },
            {
                accessor: 'permissions', title: "Permissions", textAlign: 'center',
                render: (role: Role) => (
                    <Group>
                        {role.permissions.map(elm => {
                            return (<Badge color={"blue"}>
                                {elm.label}
                            </Badge>)
                        })}
                    </Group>
                )
            },
            {
                accessor: 'active', title: "Active", width: '10%', textAlign: 'center',
                render: (Roles: Role) => (
                    <Badge color={Roles.active ? 'green' : 'red'}>
                        {Roles.active ? 'Active' : 'deactivated'}
                    </Badge>
                )
            },
            {
                accessor: 'Actions',
                textAlign: 'center',
                render: (record: Role) => (
                    <OrgRoleActionTable record={record} {...props} />
                )
            }
        ]
    }, [props])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}



export default OrgRoleTableDisplay;
