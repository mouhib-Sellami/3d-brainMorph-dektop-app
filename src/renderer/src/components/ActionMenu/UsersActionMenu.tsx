import React from "react";
import { ActionMenuPropsType } from "./ActionMenuPropsType";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDots, IconRefresh, IconUserPlus } from "@tabler/icons-react";
import PermissionGuard from "@/guards/PermissionGuard";

export interface UsersActionMenuProps extends ActionMenuPropsType {
    createUser: () => void
}

const UsersActionMenu: React.FC<UsersActionMenuProps> = (props) => {
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
                <PermissionGuard permission="can_create_user">
                    <Menu.Item
                        leftSection={<IconUserPlus size={16} color={theme.colors.blue[6]} stroke={1.5} />}
                        onClick={() => { props.createUser() }}
                    >
                        Add new Member
                    </Menu.Item>
                </PermissionGuard>

            </Menu.Dropdown>
        </Menu>
    )
}
export default UsersActionMenu;