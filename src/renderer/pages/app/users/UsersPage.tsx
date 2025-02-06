import React from "react";
import { dispatch } from "@/redux/store";
import { Box, Flex, Title } from "@mantine/core";
import HeaderWrapper from "@renderer/components/ui/HeaderWrapper";
import ContentWrapper from "@renderer/components/ui/ContentWrapper";
import useUsers from "@renderer/hooks/useUsers";
import { getUsers } from "@renderer/redux/slices/userSlice";
import UserDataTable from "@renderer/components/dataTables/user-dataTable/UserDataTable";
import UsersActionMenu from "@renderer/components/ActionMenu/UsersActionMenu";
import AddUserModal from "@renderer/components/modals/userModals/AddUserModal";

const UsersPage: React.FC = () => {
    const { users, isLoading } = useUsers()
    const [openAddModal, setOpenAddModal] = React.useState(false)

    const fetchUsers = React.useCallback(async () => {
        await dispatch(getUsers())
    }, [])

    React.useEffect(() => {
        fetchUsers().then().catch(err => console.log(err))
    }, [])

    return (
        <Box>
            <HeaderWrapper>
                <Flex align={"center"} justify={"space-between"}>
                    <Title ta="left" c={"primary"}>
                        Users
                    </Title>
                    <UsersActionMenu reload={() => fetchUsers()} createUser={() => { setOpenAddModal(true) }} position="bottom-end" />
                </Flex>
            </HeaderWrapper>
            <ContentWrapper>
                <UserDataTable count={users.length} isLoading={isLoading} records={users} onChange={fetchUsers} />
            </ContentWrapper>
            {openAddModal ? <AddUserModal isVisible={openAddModal} onAdd={() => { fetchUsers(); setOpenAddModal(false) }} onClose={() => setOpenAddModal(false)} /> : null}
        </Box>
    )
}
export default UsersPage;
