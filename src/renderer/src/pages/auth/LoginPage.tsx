import { Box, Button, Flex, Group, PasswordInput, TextInput } from "@mantine/core";
import { login } from "../../redux/slices/authSlice";
import { useForm } from "@mantine/form";
import { dispatch } from '../../redux/store';
import { IconLock, IconUser } from "@tabler/icons-react";
import useAuth from "@/hooks/useAuth";
import React from "react";
import Logo from "@renderer/components/dotLottie/Logo";

const LoginPage: React.FC = () => {
    const { isLoading } = useAuth();

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
        },

        validate: {
            username: (val) => (val.length === 0 ? 'Invalid username' : null),
            password: (val) => (val.length < 4 ? 'Invalid Password' : null),
        },
    });

    const onSubmit = async (data: any) => {
        try {
            dispatch(login(data))
        } catch (error) {
            console.error(error);

        }
    };

    return (<>

        <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
            style={{
                height: "100%",
                width: "100%",
            }}
        >
            <Box maw={400}
                mx="auto"
                bg={"secondary"}
                style={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    width: "30%",
                    padding: "1rem"

                }}
            >
                <div style={{ width: "100%", margin: "auto", padding: "1.5rem", textAlign: 'center' }}>
                    <Logo />
                </div>
                <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <TextInput
                        className="inputForm"
                        withAsterisk
                        label="Username"
                        placeholder="jhon.doe"
                        leftSection={<IconUser size={16} />}
                        style={{ marginBottom: 10 }}
                        {...form.getInputProps('username')}
                    />

                    <PasswordInput
                        className="inputForm mt-2"
                        withAsterisk

                        label="Password"
                        leftSection={<IconLock size={16} />}
                        placeholder="*********"

                        {...form.getInputProps('password')}
                    />
                    <Group mt="md" justify="center">
                        <Button type="submit" color={"primary"} fullWidth loading={isLoading}>Log in</Button>
                    </Group>

                </form>
            </Box>
        </Flex>
    </>)
}

export default LoginPage;