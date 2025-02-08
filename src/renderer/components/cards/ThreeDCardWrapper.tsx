import React from "react";
import { ActionIcon, Button, Card, Center, Flex, Grid, Overlay, useMantineTheme } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { Patient } from "@renderer/types/Patient";
import { Icon3dCubeSphere, IconAugmentedReality, IconAugmentedReality2, IconUpload, IconZoomInArea } from "@tabler/icons-react";
import UploadPatientImagesModal from "../modals/patientModals/UploadPatientImagesModal";
import { dispatch } from "@renderer/redux/store";
import { getPatient, startPatient } from "@renderer/redux/slices/patientSlice";
import CustomLoadingOverlay from "../customLoading/CustomLoadingOverlay";
import { useSocketSubscribe } from "@renderer/hooks/useSocketSubscribe";
import usePatients from "@renderer/hooks/usePatients";
import ThreeViewerCard from "../treeD/ThreeViewerCard";
import RenderWithoutSlicerModal from "../treeD/models/RenderWithoutSlicerModal";
import RenderWithSlicerModal from "../treeD/models/RenderWithSlicerModal";
import RenderARModal from "../treeD/models/RenderARModal";

export interface ThreeDCardWrapperProps {
    patient: Patient
}



const ThreeDCardWrapper: React.FC<ThreeDCardWrapperProps> = () => {
    const { selectedPatient } = usePatients()
    const [opened, { open, close }] = useDisclosure();
    const theme = useMantineTheme()
    const [selectedPath, setSelectedPath] = React.useState('');
    const [action, setAction] = React.useState<"VIEW" | "UPLOAD" | "VIEW_BRAIN" | "VIEW_TUMOR" | "AR" | string>("");

    const PATIENT = React.useMemo(() => {
        if (!selectedPatient)
            return
        return selectedPatient
    }, [selectedPatient])

    const startGeneration = React.useCallback(async () => {
        if (!PATIENT || !PATIENT.id)
            return
        await dispatch(startPatient(PATIENT.id))
    }, [PATIENT])

    const fetchPatient = React.useCallback(async () => {
        if (!PATIENT || !PATIENT.id)
            return
        await dispatch(getPatient(PATIENT.id))
    }, [PATIENT])

    React.useEffect(() => {
        fetchPatient()
    }, [])

    const handlePatient = React.useCallback(
        async (data) => {
            if (!PATIENT || !PATIENT.id)
                return
            const patientData = JSON.parse(data)

            if (patientData.id == PATIENT.id) {
                console.log("fetching");

                fetchPatient()
            }

        }, [PATIENT])

    useSocketSubscribe('patient_start', handlePatient)
    useSocketSubscribe('patient_complete', handlePatient)

    const closeModal = React.useCallback(() => {
        setSelectedPath("")
        setAction("")
        close()
    }, [])
    console.log(action);
    console.log(PATIENT);

    return (
        <Card h={"100%"} pos={"relative"} color="darkGray">
            <Grid h={"100%"} grow gutter="sm">
                <Grid.Col span={6} mih={300} >
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <ActionIcon variant="filled" aria-label="Settings" style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
                            onClick={() => {
                                if (PATIENT) {
                                    setSelectedPath(PATIENT.public_brain);
                                    open()
                                    setAction("VIEW_BRAIN")
                                }
                            }}
                        >
                            <IconZoomInArea style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        {PATIENT && PATIENT.is_generated && <ThreeViewerCard model_path={PATIENT.public_brain} />}
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <ActionIcon variant="filled" aria-label="Settings" style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
                            onClick={() => {
                                if (PATIENT) {
                                    setSelectedPath(PATIENT.brain_combine_file_path);
                                    open()
                                    setAction("VIEW")
                                }
                            }}
                        >
                            <IconZoomInArea style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        {PATIENT && PATIENT.is_generated && <ThreeViewerCard model_path={PATIENT.public_combined_brain} />}
                    </Card>
                </Grid.Col>
                <Grid.Col span={6} mih={300}>
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <ActionIcon variant="filled" aria-label="Settings" style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
                            onClick={() => {
                                if (PATIENT) {
                                    setSelectedPath(PATIENT.public_tumor);
                                    open()
                                    setAction("VIEW_TUMOR")
                                }
                            }}
                        >
                            <IconZoomInArea style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        {PATIENT && PATIENT.is_generated && <ThreeViewerCard model_path={PATIENT.public_tumor} />}
                    </Card>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <ActionIcon variant="filled" aria-label="Settings" style={{ position: "absolute", top: 10, right: 10, zIndex: 100 }}
                            onClick={() => {
                                if (PATIENT) {
                                    setSelectedPath(PATIENT.public_tumor);
                                    open()
                                    setAction("AR")
                                }
                            }}
                        >
                            <IconAugmentedReality style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <Center h={"100%"} w={"100%"}>
                            <IconAugmentedReality2 size={150} />
                        </Center>
                    </Card>
                </Grid.Col>

            </Grid>
            {
                PATIENT && PATIENT.has_files && !PATIENT.is_generated && !PATIENT.is_processing &&
                <Overlay color={theme.colors.darkGray[5]} backgroundOpacity={0.8} >
                    <Flex align={"center"} justify={"center"} h={"100%"} w={"100%"}>
                        <Button leftSection={<Icon3dCubeSphere />} onClick={startGeneration}>Generate 3D</Button>
                    </Flex>
                </Overlay>
            }
            {
                PATIENT && !PATIENT.has_files &&
                <Overlay color={theme.colors.darkGray[5]} backgroundOpacity={0.8} >
                    <Flex align={"center"} justify={"center"} h={"100%"} w={"100%"}>
                        <Button leftSection={<IconUpload />} onClick={() => { setAction('UPLOAD'); open() }}>Upload images</Button>
                    </Flex>
                </Overlay>
            }
            {
                PATIENT && PATIENT.is_processing &&
                <CustomLoadingOverlay />
            }
            {opened && !PATIENT.has_files && action == "UPLOAD" && <UploadPatientImagesModal isVisible={opened} patient={PATIENT} onUpload={closeModal} onClose={closeModal} />}
            {opened && PATIENT && action != "UPLOAD" && action != "VIEW" && <RenderWithoutSlicerModal model_path={selectedPath} isVisible={opened} onClose={closeModal} />}
            {opened && PATIENT && action == "VIEW" && <RenderWithSlicerModal model_path={PATIENT.public_combined_brain} isVisible={opened} onClose={closeModal} />}
            {opened && PATIENT && action == "AR" && <RenderARModal model_path={PATIENT.public_combined_brain} isVisible={opened} onClose={closeModal} />}
        </Card >
    )
}

export default ThreeDCardWrapper;