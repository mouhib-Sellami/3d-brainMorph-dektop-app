import React from "react";
import { modals } from "@mantine/modals";
import { Center, Container, Flex, Grid, Text } from "@mantine/core";
import { IconAlertCircle, IconTriangle } from "@tabler/icons-react";

const WarningModal = (props: ErrorRenderInterface) => {
    modals.open({
        centered: true,
        children: (
            <Container >
                <Grid>
                    <Grid.Col span={1} style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Center>
                            <IconTriangle color="orange" size={30} />
                        </Center>
                    </Grid.Col>
                    <Grid.Col span={11} >
                        <Text size="lg" fw={700}>Warning</Text>
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

export default WarningModal;