import { Button, Card, Flex, Grid, Overlay, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { Patient } from "@renderer/types/Patient";
import { Icon3dCubeSphere, IconUpload } from "@tabler/icons-react";
import React from "react";
import UploadPatientImagesModal from "../modals/patientModals/UploadPatientImagesModal";

export interface ThreeDCardWrapperProps {
    patient: Patient
}

const ThreeDCardWrapper: React.FC<ThreeDCardWrapperProps> = (props) => {
    const [opened, { open, close }] = useDisclosure();
    const theme = useMantineTheme()
    
    const PATIENT = React.useMemo(() => {
        return props.patient
    }, [props.patient])

    return (
        <Card h={"100%"} pos={"relative"} color="darkGray">
            <Grid h={"100%"} grow gutter="sm">
                <Grid.Col span={6} mih={250} >
                    <Card bg="black" w={"100%"} h={"100%"} >

                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card bg="black" w={"100%"} h={"100%"}>

                    </Card>
                </Grid.Col>
                <Grid.Col span={6} mih={250}>
                    <Card bg="black" w={"100%"} h={"100%"}>

                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card bg="black" w={"100%"} h={"100%"}>

                    </Card>
                </Grid.Col>

            </Grid>
            {PATIENT.has_files && !PATIENT.is_generated &&
                <Overlay color={theme.colors.darkGray[5]} backgroundOpacity={0.8} >
                    <Flex align={"center"} justify={"center"} h={"100%"} w={"100%"}>
                        <Button leftSection={<Icon3dCubeSphere />}>Generate 3D</Button>
                    </Flex>
                </Overlay>
            }
            {!PATIENT.has_files &&
                <Overlay color={theme.colors.darkGray[5]} backgroundOpacity={0.8} >
                    <Flex align={"center"} justify={"center"} h={"100%"} w={"100%"}>
                        <Button leftSection={<IconUpload />} onClick={open}>Upload images</Button>
                    </Flex>
                </Overlay>
            }
            {opened && <UploadPatientImagesModal isVisible={opened} patient={PATIENT} onUpload={close} onClose={close} />}
        </Card>
    )
}

export default ThreeDCardWrapper;