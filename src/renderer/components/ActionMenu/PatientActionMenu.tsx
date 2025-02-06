import React from "react";
import { ActionMenuPropsType } from "./ActionMenuPropsType";
import { ActionIcon, Menu, useMantineTheme } from "@mantine/core";
import { IconDots, IconRefresh, IconUserPlus } from "@tabler/icons-react";
import PermissionGuard from "@/guards/PermissionGuard";

export interface PatientActionMenuProps extends ActionMenuPropsType {
    createPatient: () => void
}

const PatientActionMenu: React.FC<PatientActionMenuProps> = (props) => {
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
                <PermissionGuard permission="can_create_patient">
                    <Menu.Item
                        leftSection={<IconUserPlus size={16} color={theme.colors.primary[6]} stroke={1.5} />}
                        onClick={() => { props.createPatient() }}
                        c={"white"}
                        
                    >
                        Add new Patient
                    </Menu.Item>
                </PermissionGuard>

            </Menu.Dropdown>
        </Menu>
    )
}
export default PatientActionMenu;