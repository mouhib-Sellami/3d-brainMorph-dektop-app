import React from "react";
import { ActionMenuPropsType } from "./ActionMenuPropsType";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDots, IconRefresh } from "@tabler/icons-react";

export interface PDashboardActionMenuProps extends ActionMenuPropsType {

}

const DashboardActionMenu: React.FC<PDashboardActionMenuProps> = (props) => {
    const theme = useMantineTheme();

    return (
        <Menu transitionProps={{ transition: 'pop-top-right', duration: 150 }}
            position={props.position}
            width={220}
            withinPortal

        >
            <Menu.Target>
                <ActionIcon>
                    <IconDots size={16} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown bg={"darkGray"} style={{
                borderColor: theme.colors.primary[0]
            }}>
                <Menu.Item
                    c={"white"}
                    leftSection={<IconRefresh size={16} color={theme.colors.primary[6]} stroke={1.5} />}
                    onClick={() => props.reload()}
                >
                    Reload
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
export default DashboardActionMenu;