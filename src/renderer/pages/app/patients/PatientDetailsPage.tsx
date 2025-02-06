import React from "react";
import { Box, Button, Flex, Grid, Title } from "@mantine/core";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import usePatients from "@renderer/hooks/usePatients";
import PatientCard from "@renderer/components/cards/PatientCard";
import ThreeDCardWrapper from "@renderer/components/cards/ThreeDCardWrapper";
import RapportModal from "@components/modals/patientModals/RapportModal";
import { useDisclosure } from "@mantine/hooks";
import { IconFile } from "@tabler/icons-react";


const PatientDetailsPage: React.FC = () => {
    const { selectedPatient } = usePatients();
    const [opened, { open, close }] = useDisclosure();
    return (
        <Box>
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Patient Details
                    </Title>
                    {selectedPatient && selectedPatient.is_generated && <Button leftSection={<IconFile size={16} />} onClick={open}>View Rapport</Button>}
                </Flex>
            </HeaderWrapper>
            <ContentWrapper>
                <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
                    <Grid.Col span={4}>
                        {selectedPatient && <PatientCard patient={selectedPatient} />}
                    </Grid.Col>
                    <Grid.Col span={8}>
                        {selectedPatient && <ThreeDCardWrapper patient={selectedPatient} />}
                    </Grid.Col>
                </Grid>
            </ContentWrapper>
            {selectedPatient && opened && <RapportModal pdf_path={selectedPatient.public_rapport} isVisible={opened} onClose={close} />}
        </Box>
    )
}
export default PatientDetailsPage;
