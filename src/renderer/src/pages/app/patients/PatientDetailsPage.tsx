import React from "react";
import { Box, Flex, Grid, Title } from "@mantine/core";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import usePatients from "@renderer/hooks/usePatients";
import PatientCard from "@renderer/components/cards/PatientCard";
import ThreeDCardWrapper from "@renderer/components/cards/ThreeDCardWrapper";


const PatientDetailsPage: React.FC = () => {
    const { selectedPatient } = usePatients();
    console.log(selectedPatient);

    return (
        <Box>
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Patient Details
                    </Title>
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
        </Box>
    )
}
export default PatientDetailsPage;
