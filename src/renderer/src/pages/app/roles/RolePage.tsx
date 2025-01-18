import React from "react";
import { dispatch } from "@/redux/store";
import { Box, Flex, Title } from "@mantine/core";
import OrgRoleTableDisplay from "@/components/DataTablePagination/dataTypeDisplay/OrgRoleTableDisplay";
import AddRoleModal from "@/components/modals/RoleModals/AddRoleModal";
import { onError } from "@/redux/slices/errorSlice";
import ViewRoleModal from "@/components/modals/RoleModals/ViewRoleModal";
import EditRoleModal from "@/components/modals/RoleModals/EditRoleModal";
import useDeleteConfirmModal from "@renderer/hooks/useDeleteConfirmModal";
import useRole from "@renderer/hooks/useRole";
import { deleteRole, getRoles } from "@renderer/redux/slices/roleSlice";
import CustomLoadingOverlay from "@renderer/components/customLoading/CustomLoadingOverlay";
import CustomDataTable from "@renderer/components/DataTablePagination/CustomDataTable";
import RoleActionMenu from "@renderer/components/ActionMenu/RoleActionMenu";

const RolePage: React.FC = () => {
    const { roles, isLoading } = useRole()
    const [openAddModal, setOpenAddModal] = React.useState(false)
    const { displayDeleteConfirmModal } = useDeleteConfirmModal()
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null)
    const [viewRole, setViewRole] = React.useState(false)
    const [updateRole, setUpdateRole] = React.useState(false)
    const { COLUMNS, PAGE_SIZE } = OrgRoleTableDisplay({
        onDelete: (record) => displayDeleteConfirmModal(
            () => { delete_(record.id) },
            () => {
                console.log("cancel");
            }),
        onSelect: (record) => {
            setSelectedRole(record)
            setViewRole(true)
        },
        onUpdate: (record) => {
            setSelectedRole(record)
            setUpdateRole(true)
        },
    })
    console.log(selectedRole);
    
    const delete_ = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteRole(id))
        if (res.meta.requestStatus == "rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot delete base app roles",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "delete roles"
            })), 500)
        } else {
            fetchRoles().then().catch()
        }
    }, [])

    const fetchRoles = React.useCallback(async () => {
        await dispatch(getRoles())
    }, [])

    React.useEffect(() => {
        fetchRoles().then().catch(err => console.log(err))
    }, [])

    return (
        <Box>
            <Flex
                py={'xl'}
                px={'lg'}
                direction={{ base: 'column', sm: 'row' }}
                gap={{ base: 'sm', sm: 'lg' }}
                justify={{ sm: 'space-between' }}
            >
                <Title ta="center">
                    Privileges
                </Title>

                <RoleActionMenu reload={() => fetchRoles()} createRole={() => { setOpenAddModal(true) }} position="bottom-end" />
            </Flex>

            <Box style={{ height: "100%" }}>
                {isLoading ?
                    <CustomLoadingOverlay />
                    :
                    <CustomDataTable records={roles} columns={COLUMNS} pageSize={PAGE_SIZE} />
                }
            </Box>
            {openAddModal ? <AddRoleModal isVisible={openAddModal} onAdd={() => { fetchRoles(); setOpenAddModal(false) }} onClose={() => setOpenAddModal(false)} /> : null}
            {updateRole && selectedRole ? <EditRoleModal role={selectedRole} isVisible={updateRole} onUpdate={() => { fetchRoles(); setUpdateRole(false) }} onClose={() => setUpdateRole(false)} /> : null}
            {viewRole && selectedRole ? <ViewRoleModal role={selectedRole} isVisible={viewRole} onClose={() => setViewRole(false)} /> : null}
        </Box>
    )
}
export default RolePage;
