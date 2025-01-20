import React from "react";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import useDeleteConfirmModal from "@renderer/hooks/useDeleteConfirmModal";
import { AppDataTableProps } from "../types";
import { useDisclosure } from "@mantine/hooks";
import DataTableConfig from "@renderer/config/DataTableConfig";
import { Box } from "@mantine/core";
import CustomDataTable from "@renderer/components/app-datatable/CustomDataTable";
import { dispatch } from "@renderer/redux/store";
import { onError } from "@renderer/redux/slices/errorSlice";
import { User } from "@renderer/types/User";
import UserDataTableConfig from "./UserDataTableConfig";
import EditUserModal from "@renderer/components/modals/userModals/EditUserModal";
import ViewUserModal from "@renderer/components/modals/userModals/ViewUserModal";
import { deleteUser } from "@renderer/redux/slices/userSlice";


const UserDataTable: React.FC<AppDataTableProps<User>> = ({ records, isLoading, count, onChange }) => {
    const [page, setPage] = React.useState(1);
    const [opened, { open, close }] = useDisclosure();
    const [action, setAction] = React.useState<"UPDATE" | "VIEW" | null>(null)
    const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
    const [RECORDS, setRECORDS] = React.useState(records.slice(0, DataTableConfig.MAX_PAGE_SIZE));
    const { displayDeleteConfirmModal } = useDeleteConfirmModal()

    React.useEffect(() => {
        const from = (page - 1) * DataTableConfig.MAX_PAGE_SIZE;
        const to = from + DataTableConfig.MAX_PAGE_SIZE;
        setRECORDS(records.slice(from, to));
    }, [page, DataTableConfig.MAX_PAGE_SIZE, records]);

    const { COLUMNS } = UserDataTableConfig({
        actions: [
            {
                icon: IconEye,
                action(record) {
                    setSelectedUser(record)
                    setAction("VIEW")
                    open()
                },
            },
            {
                icon: IconPencil,
                action(record) {
                    setSelectedUser(record)
                    setAction("UPDATE")
                    open()
                },
            },
            {
                icon: IconTrash,
                action(record: User) {
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
        const res = await dispatch(deleteUser(id))
        if (res.meta.requestStatus == "rejected") {
            setTimeout(() => dispatch(onError({
                content: "Cannot delete user",
                level: "ERROR",
                render: "NOTIFICATION",
                type: "delete user"
            })), 500)
        }
        onChange?.()
    }, [])

    const closeModal = React.useCallback(() => {
        close();
        setAction(null);
        setSelectedUser(null);
    }, [])
    console.log(selectedUser);
    
    return (
        <Box p={0} m={0}>
            <CustomDataTable isLoading={isLoading} columns={COLUMNS} pageSize={DataTableConfig.MAX_PAGE_SIZE} total={count} records={RECORDS} onPageChanges={(p) => { setPage(p) }} />
            {opened && action == "UPDATE" && selectedUser ? <EditUserModal user={selectedUser} isVisible={opened} onUpdate={() => { closeModal(); onChange?.() }} onClose={closeModal} /> : null}
            {opened && action == "VIEW" && selectedUser ? <ViewUserModal user={selectedUser} isVisible={opened} onClose={closeModal} /> : null}
        </Box>
    )
}
export default UserDataTable;