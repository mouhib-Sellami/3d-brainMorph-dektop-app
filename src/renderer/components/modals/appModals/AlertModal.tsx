import React from "react";
import { modals } from "@mantine/modals";
import { Center, Container, Flex, Grid, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const AlertModal = (props: ErrorRenderInterface) => {
    modals.open({
        centered: true,
        children: (
            <Container >
                <Grid>
                    <Grid.Col span={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Center>
                            <IconAlertCircle color="blue" size={30} />
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={11} >
                        <Text size="lg" fw={700}>Info</Text>
                        <Text size="md" fw={500}>{props.content}</Text>
                    </Grid.Col>
                </Grid>
            </Container>
        ),
        withCloseButton: false,
        withOverlay: true,
        onClose: () => props.onClose()
    });
}

export default AlertModal;