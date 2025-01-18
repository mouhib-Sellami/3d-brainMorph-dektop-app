import { MenuProps } from "@mantine/core";

export interface ActionMenuPropsType extends MenuProps {
    reload: () => void,
}