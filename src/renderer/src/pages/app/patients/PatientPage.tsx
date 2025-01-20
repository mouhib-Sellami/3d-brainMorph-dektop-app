import React from "react";
import { dispatch } from "@/redux/store";
import { Box, Flex, Title } from "@mantine/core";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import usePatients from "@renderer/hooks/usePatients";
import { getPatients } from "@renderer/redux/slices/patientSlice";
import PatientActionMenu from "@renderer/components/ActionMenu/PatientActionMenu";
import PatientDataTable from "@renderer/components/dataTables/patient-dataTable/PatientDataTable";

const PatientPage: React.FC = () => {
    const { patients, isLoading } = usePatients()
    const [openAddModal, setOpenAddModal] = React.useState(false)

    const fetchPatients = React.useCallback(async () => {
        await dispatch(getPatients())
    }, [])

    React.useEffect(() => {
        fetchPatients().then().catch(err => console.log(err))
    }, [])

    return (
        <Box>
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Patients
                    </Title>
                    <PatientActionMenu reload={() => fetchPatients()} createPatient={() => { setOpenAddModal(true) }} position="bottom-end" />
                </Flex>
            </HeaderWrapper>
            <ContentWrapper>
                <PatientDataTable count={patients.length} isLoading={isLoading} records={patients} onChange={fetchPatients} />
            </ContentWrapper>
            {/* {openAddModal ? <AddRoleModal isVisible={openAddModal} onAdd={() => { fetchRoles(); setOpenAddModal(false) }} onClose={() => setOpenAddModal(false)} /> : null} */}
        </Box>
    )
}
export default PatientPage;
