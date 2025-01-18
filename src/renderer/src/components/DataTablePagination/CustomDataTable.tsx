import React from "react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import classes from "./style.module.css";
import { Box, useMantineTheme } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";

export interface CustomDataTable {
    pageSize: number,
    columns: Array<DataTableColumn>
}

const CustomDataTable = (props) => {
    const [page, setPage] = React.useState(1)
    const theme = useMantineTheme();

    return (
        <DataTable
            withTableBorder
            borderRadius="md"
            shadow="md"
            withColumnBorders
            striped
            highlightOnHover
            horizontalSpacing="sm"
            verticalSpacing="sm"
            fz="sm"
            verticalAlign="center"
            records={props.records}
            columns={props.columns}
            totalRecords={props.records.length}
            recordsPerPage={props.pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            loadingText="Loading..."
            noRecordsText="No records found"
            noRecordsIcon={
                <Box p={4} mb={4} className={classes.noRecordsBox}>
                    <IconMoodSad size={36} strokeWidth={1.5} />
                </Box>
            }
            styles={{
                header: {
                    color: theme.colors.primary[5]
                },
                pagination: {

                },
                table: {
                },
                footer: {

                },
            }}
            scrollAreaProps={{ type: 'never' }}
            height={550}
            w={"100%"}
            maxHeight={"100%"}
        />
    )
}

export default CustomDataTable;