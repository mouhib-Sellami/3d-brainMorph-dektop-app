import PermissionGuard from "@/guards/PermissionGuard";
import { Project } from "@/types/Project";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import React from "react";


export interface ProjectActionTableProps extends DataTableActions<Project> {
    record: Project
}

const ProjectActionTable = (props: ProjectActionTableProps) => {
    return (

        <Group gap={3} justify="center" wrap="nowrap">
            <ActionIcon
                size={30}
                variant="subtle"
                color="green"
                onClick={() => props.onSelect(props.record)}
            >
                <IconEye size={18} />
            </ActionIcon>
            <PermissionGuard permission="can_change_project">
                <ActionIcon
                   size={30}
                    variant="subtle"
                    color="blue"
                    onClick={() => props.onUpdate(props.record)}
                >
                    <IconEdit size={18} />
                </ActionIcon>
            </PermissionGuard>
            <PermissionGuard permission="can_delete_project">

                <ActionIcon
                    size={30}
                    variant="subtle"
                    color="red"
                    onClick={() => props.onDelete(props.record)}
                >
                    <IconTrash size={18} />
                </ActionIcon>
            </PermissionGuard>
        </Group>

    )
}

export default ProjectActionTable;
