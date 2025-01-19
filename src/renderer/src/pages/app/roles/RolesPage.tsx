import React from "react";
import { dispatch } from "@/redux/store";
import { Box, Flex, Title } from "@mantine/core";
import { getRoles } from "@renderer/redux/slices/roleSlice";
import RoleActionMenu from "@renderer/components/ActionMenu/RoleActionMenu";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import RoleDataTable from "@renderer/components/dataTables/role-dataTable/RoleDataTable";
import AddRoleModal from "@renderer/components/modals/RoleModals/AddRoleModal";
import useRoles from "@renderer/hooks/useRoles";

const RolePage: React.FC = () => {
    const { roles, isLoading } = useRoles()
    const [openAddModal, setOpenAddModal] = React.useState(false)

    const fetchRoles = React.useCallback(async () => {
        await dispatch(getRoles())
    }, [])

    React.useEffect(() => {
        fetchRoles().then().catch(err => console.log(err))
    }, [])

    return (
        <Box>
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Privileges
                    </Title>
                    <RoleActionMenu reload={() => fetchRoles()} createRole={() => { setOpenAddModal(true) }} position="bottom-end" />
                </Flex>
            </HeaderWrapper>
            <ContentWrapper>
                <RoleDataTable count={roles.length} isLoading={isLoading} records={roles} onChange={fetchRoles} />
            </ContentWrapper>
            {openAddModal ? <AddRoleModal isVisible={openAddModal} onAdd={() => { fetchRoles(); setOpenAddModal(false) }} onClose={() => setOpenAddModal(false)} /> : null}
        </Box>
    )
}
export default RolePage;
