import React from "react";
import { AppDataTableProps } from "../types";
import DataTableConfig from "@renderer/config/DataTableConfig";
import { Box } from "@mantine/core";
import CustomDataTable from "@renderer/components/app-datatable/CustomDataTable";
import TaskDataTableConfig from "./TaskDataTableConfig";
import { Task } from "@renderer/types/Task";


const TasksDataTable: React.FC<AppDataTableProps<Task>> = ({ records, isLoading, count }) => {
    const [page, setPage] = React.useState(1);
    const [RECORDS, setRECORDS] = React.useState(records.slice(0, DataTableConfig.MAX_PAGE_SIZE));

    React.useEffect(() => {
        const from = (page - 1) * DataTableConfig.MAX_PAGE_SIZE;
        const to = from + DataTableConfig.MAX_PAGE_SIZE;
        setRECORDS(records.slice(from, to));
    }, [page, DataTableConfig.MAX_PAGE_SIZE, records]);

    const { COLUMNS } = TaskDataTableConfig({
    });

    return (
        <Box p={0} m={0}>
            <CustomDataTable isLoading={isLoading} columns={COLUMNS} pageSize={RECORDS.length} total={count} records={RECORDS} onPageChanges={(p) => { setPage(p) }} />
        </Box>
    )
}
export default TasksDataTable;