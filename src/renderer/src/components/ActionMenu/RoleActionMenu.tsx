import React from "react";
import { ActionMenuPropsType } from "./ActionMenuPropsType";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDots, IconRefresh, IconUserPlus } from "@tabler/icons-react";
import PermissionGuard from "@/guards/PermissionGuard";

export interface RoleActionMenuProps extends ActionMenuPropsType {
    createRole: () => void
}

const RoleActionMenu: React.FC<RoleActionMenuProps> = (props) => {
    const theme = useMantineTheme();

    return (
        <Menu transitionProps={{ transition: 'pop-top-right', duration: 150 }} position={props.position} width={220} withinPortal>
            <Menu.Target>
                <ActionIcon>
                    <IconDots size={16} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    leftSection={<IconRefresh size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                    onClick={() => props.reload()}
                >
                    Reload
                </Menu.Item>
                <PermissionGuard permission="can_create_role">
                    <Menu.Item
                        leftSection={<IconUserPlus size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                        onClick={() => { props.createRole() }}
                    >
                        Add new Role
                    </Menu.Item>
                </PermissionGuard>

            </Menu.Dropdown>
        </Menu>
    )
}
export default RoleActionMenu;