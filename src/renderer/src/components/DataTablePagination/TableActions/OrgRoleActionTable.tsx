import PermissionGuard from "@/guards/PermissionGuard";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import React from "react";

export interface RoleActionTableProps extends DataTableActions<Role> {
    record: Role
}

const OrgRoleActionTable: React.FC<RoleActionTableProps> = (props) => {

    return (
        <Group gap={3} justify="right" wrap="nowrap">
            <ActionIcon
                size={30}
                variant="subtle"
                color="green"
                onClick={() => props.onSelect(props.record)}
            >
                <IconEye size={18} />
            </ActionIcon>
            <PermissionGuard permission="can_change_role">
                <ActionIcon
                    size={30}
                    variant="subtle"
                    color="blue"
                    onClick={() => props.onUpdate(props.record)}
                >
                    <IconEdit size={18} />
                </ActionIcon>
            </PermissionGuard>
            <PermissionGuard permission="can_delete_role">

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

export default OrgRoleActionTable;
