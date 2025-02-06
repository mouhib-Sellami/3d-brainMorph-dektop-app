import { AppShell, Burger, Center, Flex, useMantineTheme } from '@mantine/core';
import { useDisclosure, useHeadroom } from '@mantine/hooks';
import { Outlet } from 'react-router';
import { Navbar } from './navbar/Navbar';
import { navLinks } from '@/components/navbar-components/navLinks';
import NavHeader from './navbar/NavHeader';
import Logo from '../dotLottie/Logo';

export function DashboardLayout() {
    const [opened, { toggle }] = useDisclosure();
    const theme = useMantineTheme();
    const pinned = useHeadroom({ fixedAt: 20 });

    return (
        <AppShell
            style={{
                backgroundColor: theme.colors.darkGray[0],
            }}
            layout="alt"
            header={{ height: 60, offset: true, collapsed: !pinned }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header withBorder={false} bg={theme.colors.darkGray[0]}>
                <Flex h={"100%"} w={"100%"} align={"center"} gap={10} bg={"transparent"}>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" lineSize={5} p={10} color='secondary' />
                    <NavHeader />
                </Flex>
            </AppShell.Header>
            <AppShell.Navbar p="md" withBorder={false} bg={"secondary"}>
                <Flex w={"100%"} align='center' justify='center' direction={"row"}>
                    <Center w={"100%"} h={60}>
                        <Logo />
                    </Center>
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" lineSize={5} color='secondary'
                        style={{
                            position: "absolute",
                            right: 20,
                        }}
                    />
                </Flex>
                <Navbar data={navLinks} hidden={!opened} />
            </AppShell.Navbar>
            <AppShell.Main bg={"darkGray"}>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}