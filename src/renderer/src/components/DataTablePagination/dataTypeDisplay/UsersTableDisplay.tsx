import React from "react";
import { Badge } from "@mantine/core";
import { DataTableColumn } from "mantine-datatable";
import UserActionTable from "../TableActions/UserActionTable";
import { OrgMember } from "@/types/User";
const UsersTableDisplay = (props: DataTableActions<OrgMember>) => {

    const PAGE_SIZE = React.useMemo(() => {
        return 25
    }, []);


    const COLUMNS: Array<DataTableColumn<OrgMember>> = React.useMemo(() => {

        return [
            {
                accessor: 'user.id', title: "#", width: '5%', textAlign: 'center',
            },
            {
                accessor: 'user.first_name', title: "First name", width: '20%', textAlign: 'center',
            },
            {
                accessor: 'user.last_name', title: "Last name", width: '20%', textAlign: 'center',
            },
            {
                accessor: 'user.email', title: "Email", width: '30%', textAlign: 'center',
            },
            {
                accessor: 'role.name', title: "Role", width: '10%', textAlign: 'center',
            },
            {
                accessor: 'active', title: "Active", width: '10%', textAlign: 'center',
                render: (record: OrgMember) => (
                    <Badge color={record.user.is_active ? 'green' : 'red'}>
                        {record.user.is_active ? 'Active' : 'deactivated'}
                    </Badge>
                )
            },
            {
                accessor: 'Actions',
                textAlign: 'center',
                render: (record: OrgMember) => (
                    <UserActionTable record={record} {...props} />
                )
            }
        ]
    }, [])


    return {
        COLUMNS,
        PAGE_SIZE
    }
}


export default UsersTableDisplay;
