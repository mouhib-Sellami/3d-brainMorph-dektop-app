import { Box, Group, ThemeIcon, useDirection, useMantineTheme } from "@mantine/core";
import { IconChevronLeft, IconChevronRight, IconHome2 } from "@tabler/icons-react";
import classes from "./NavLinksGroup.module.css";


export type AppNavLinkProps = {
    hasLinks: boolean,
    active: boolean,
    Icon: typeof IconHome2,
    label: string,
    opened: boolean

}

const AppNavLink: React.FC<AppNavLinkProps> = ({ hasLinks, active, Icon, label, opened }) => {
    const theme = useMantineTheme();
    const { dir } = useDirection();
    const ChevronIcon = dir === "ltr" ? IconChevronRight : IconChevronLeft;
    
    return (
        <Group gap={0} justify="space-between">
            <Box style={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                    <Icon size="24" color={active ? "white" : theme.colors.linkColor[0]} />
                </ThemeIcon>
                <Box ml="8">{label}</Box>
            </Box>
            {hasLinks && (
                <ChevronIcon
                    className={classes.chevron}
                    size="1rem"
                    color="white"
                    stroke={1.5}
                    style={{
                        transform: opened
                            ? `rotate(${dir === "rtl" ? -90 : 90}deg)`
                            : "none",
                    }}
                />
            )}
        </Group>
    )
}

export default AppNavLink;