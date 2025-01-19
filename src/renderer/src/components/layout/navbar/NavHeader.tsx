import { navLinks } from "@/components/navbar-components/navLinks";
import { Box, Flex, Group, Menu, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { useLocation } from "react-router";
import UserButton from "./UserButton";
import { IconChevronRight, IconLogout } from "@tabler/icons-react";
import useAuth from "@renderer/hooks/useAuth";
import { dispatch } from "@renderer/redux/store";
import { logout } from "@renderer/redux/slices/authSlice";
import avatarImage from "@renderer/assets/avatar.svg"
export interface BreadCrumbDisplay {
    item: string,
    idx: number
}

const NavHeader: React.FC = ({ }) => {
    const { pathname } = useLocation();
    const { colors } = useMantineTheme();
    const { user } = useAuth();
    const BREAD_CRUMBS = React.useMemo(() => {
        const link = navLinks.find(elm => elm.link === pathname)
        if (link) {
            return [link.name];
        }
        else {
            const subLink = navLinks.find(elm => elm.links?.find(e => e.link === pathname))
            if (subLink)
                return [subLink.name, subLink.links?.find(e => e.link === pathname)?.label]

        }
        return ['Dashboard'];
    }, [navLinks, pathname])

    const BreadCrumbDisplay: React.FC<BreadCrumbDisplay> = ({ item, idx }) => {
        return (
            <>
                <Text c={idx != BREAD_CRUMBS.length - 1 ? colors.gray[5] : colors.primary[0]} ta={"center"} key={idx}>
                    {item}
                </Text>
                {idx != BREAD_CRUMBS.length - 1 && <IconChevronRight size={18} color={colors.gray[5]} />}
            </>
        )
    }

    const logout_ = React.useCallback(async () => {
        await dispatch(logout())
    }, [])

    return (
        <Box w={"100%"} h={"100%"} px={"md"}>
            <Flex align={"center"} justify={{ xxs: "flex-end", xs: "flex-end", sm: "flex-end", md: "space-between" }} w={"100%"} h={"100%"} bg={"transparent"}>
                <Flex align={"center"} justify={"center"} visibleFrom="md">
                    <Text c={colors.gray[5]} ta={"center"}>
                        {"Brain Morph"}
                    </Text>
                    <IconChevronRight size={18} color={colors.gray[5]} />
                    {BREAD_CRUMBS?.map((elm, idx) => (
                        <BreadCrumbDisplay key={idx} idx={idx} item={elm || ""} />
                    ))}
                </Flex>
                <Group >
                    <Menu transitionProps={{ transition: 'pop-top-right', duration: 150 }} position={"bottom"} width={220} withinPortal>
                        <Menu.Target >
                            <UserButton
                                image={avatarImage}
                                name={user?.username || ""}
                                role={user?.role.name || "User"}

                            />
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item
                                onClick={logout_}
                                leftSection={<IconLogout size={14} />}
                                c={"red"}
                            >
                                Logout
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Flex>
        </Box >
    )
}

export default NavHeader;