import React from "react";
import { DataTable } from "mantine-datatable";
import classes from "./style.module.css";
import { Box, useMantineTheme } from "@mantine/core";
import { IconMoodSad } from "@tabler/icons-react";
import { CustomDataTableProps } from "./types";
import Logo from "../dotLottie/Logo";

const CustomDataTable: React.FC<CustomDataTableProps> = (props) => {
    const { columns, pageSize, records, total, onPageChanges, isLoading, ...defaultProps } = props;
    const [page, setPage] = React.useState(1)
    const theme = useMantineTheme();

    React.useEffect(() => {
        onPageChanges?.(page)
    }, [page])

    return (
        <Box p={0} bg={"transparent"} m={0}>
            <DataTable
                fetching={isLoading}
                withTableBorder
                customLoader={<Box h={200} w={200}><Logo /></Box>}
                borderRadius="md"
                backgroundColor={"dark"}
                withRowBorders
                highlightOnHover
                horizontalSpacing="xs"
                verticalAlign="center"
                striped={true}
                minHeight={200}
                records={records}
                columns={columns}
                totalRecords={total}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={(p) => setPage(p)}
                loadingText="Loading ..."
                noRecordsText="No record found"
                styles={{
                    root: {
                        background: "dark"
                    },
                    header: {
                        backgroundColor: theme.colors.secondary,
                        // color: theme.colors.primary[5]
                        textAlign: "center"
                    },
                    pagination: {

                    },
                    table: {
                    },
                    footer: {

                    },
                }}
                noRecordsIcon={
                    <Box p={4} mb={4} className={classes.noRecordsBox}>
                        <IconMoodSad size={36} strokeWidth={1.5} />
                    </Box>
                }
                scrollAreaProps={{ type: 'never' }}
                height={550}
                w={"100%"}
                maxHeight={"100%"}
                {...defaultProps}
            />
        </Box>

    )
}

export default CustomDataTable;