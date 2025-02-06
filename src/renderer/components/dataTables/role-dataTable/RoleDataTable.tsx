import React from "react";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import useDeleteConfirmModal from "@renderer/hooks/useDeleteConfirmModal";
import { AppDataTableProps } from "../types";
import { useDisclosure } from "@mantine/hooks";
import DataTableConfig from "@renderer/config/DataTableConfig";
import { Box } from "@mantine/core";
import CustomDataTable from "@renderer/components/app-datatable/CustomDataTable";
import { dispatch } from "@renderer/redux/store";
import { deleteRole } from "@renderer/redux/slices/roleSlice";
import { onError } from "@renderer/redux/slices/errorSlice";
import EditRoleModal from "@renderer/components/modals/RoleModals/EditRoleModal";
import ViewRoleModal from "@renderer/components/modals/RoleModals/ViewRoleModal";
import RoleDataTableConfig from "./RoleDataTableConfig";


const RoleDataTable: React.FC<AppDataTableProps<Role>> = ({ records, isLoading, count, onChange }) => {
    const [page, setPage] = React.useState(1);
    const [opened, { open, close }] = useDisclosure();
    const [action, setAction] = React.useState<"UPDATE" | "VIEW" | null>(null)
    const [selectedRole, setSelectedRole] = React.useState<Role | null>(null);
    const [RECORDS, setRECORDS] = React.useState(records.slice(0, DataTableConfig.MAX_PAGE_SIZE));
    const { displayDeleteConfirmModal } = useDeleteConfirmModal()

    React.useEffect(() => {
        const from = (page - 1) * DataTableConfig.MAX_PAGE_SIZE;
        const to = from + DataTableConfig.MAX_PAGE_SIZE;
        setRECORDS(records.slice(from, to));
    }, [page, DataTableConfig.MAX_PAGE_SIZE, records]);

    const { COLUMNS } = RoleDataTableConfig({
        actions: [
            {
                icon: IconEye,
                action(record) {
                    setSelectedRole(record)
                    setAction("VIEW")
                    open()
                },
            },
            {
                icon: IconPencil,
                action(record) {
                    setSelectedRole(record)
                    setAction("UPDATE")
                    open()
                },
            },
            {
                icon: IconTrash,
                action(record: Role) {
                    displayDeleteConfirmModal(
                        () => {
                            if (record.id)
                                delete_(record.id)
                        },
                        () => {
                            console.log("cancel");
                        })
                },
            }
        ]
    });
    const delete_ = React.useCallback(async (id: number) => {
        const res = await dispatch(deleteRole(id))
        if (res.meta.requestStatus == "rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot delete base app roles",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "delete roles"
            })), 500)
        }
        onChange?.()
    }, [])

    const closeModal = React.useCallback(() => {
        close();
        setAction(null);
        setSelectedRole(null);
    }, [])

    return (
        <Box p={0} m={0}>
            <CustomDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} onPageChanges={(p) => { setPage(p) }} />
            {opened && action == "UPDATE" && selectedRole ? <EditRoleModal role={selectedRole} isVisible={opened} onUpdate={() => { closeModal(); onChange?.() }} onClose={closeModal} /> : null}
            {opened && action == "VIEW" && selectedRole ? <ViewRoleModal role={selectedRole} isVisible={opened} onClose={closeModal} /> : null}
        </Box>
    )
}
export default RoleDataTable;