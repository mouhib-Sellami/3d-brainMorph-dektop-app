import PermissionGuard from "@/guards/PermissionGuard";
import { OrgMember } from "@/types/User";
import { ActionIcon, Group } from "@mantine/core";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import React from "react";


export interface UserActionTableProps extends DataTableActions<OrgMember> {
    record: OrgMember
}

const UserActionTable = (props: UserActionTableProps) => {
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
            <PermissionGuard permission="can_change_user">
                <ActionIcon
                    size={30}
                    variant="subtle"
                    color="blue"
                    onClick={() => props.onUpdate(props.record)}
                >
                    <IconEdit size={18} />
                </ActionIcon>
            </PermissionGuard>
            <PermissionGuard permission="can_delete_user">

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

export default UserActionTable;
