import React from "react";
import { DataTableColumn } from "mantine-datatable";
import { Badge, Group } from '@mantine/core';
import ProjectActionTable from "../TableActions/ProjectActionTable";
import { Project } from "@/types/Project";


const ProjectsTableDisplay = (props: DataTableActions<Project>) => {

    const PAGE_SIZE = React.useMemo(() => {
        return 25
    }, []);

    const COLUMNS: Array<DataTableColumn<Project>> = React.useMemo(() => {
        return [
            {
                accessor: 'id', title: "#", width: '5%', textAlign: 'center',
            },
            {
                accessor: 'name', title: "Name", width: '20%', textAlign: 'center',
            },
            {
                accessor: 'description', title: "Description", width: '50%', textAlign: 'center',
            },
            {
                accessor: 'members', title: "Members", width: '30%', textAlign: 'center',
                render: (record: Project) => (
                    <Group>
                        {record.members.map((elm,idx) => {
                            return (
                                <Badge color={"blue"} key={idx}>
                                    {elm.user.username}
                                </Badge>
                            )
                        })}
                    </Group>
                )
            },
            {
                accessor: 'Actions',
                textAlign: 'center',
                render: (record: Project) => (
                    <ProjectActionTable record={record} {...props} />
                )
            }
        ]
    }, [props])

    return {
        COLUMNS,
        PAGE_SIZE
    }
}



export default ProjectsTableDisplay;
