import { MantineStyleProp } from "@mantine/core";
import { IconHome2 } from "@tabler/icons-react";
import { DataTableColumn, DataTableProps } from "mantine-datatable";
import { IconType } from "recharts/types/component/DefaultLegendContent";

export interface CustomDataTableProps {
    pageSize: number,
    columns: Array<DataTableColumn>,
    records: Array<Record>,
    total: number,
    isLoading: boolean,
    onPageChanges?: (p: number) => void,
    styles?: StylesRecord<'root' | 'table' | 'header' | 'footer' | 'pagination', MantineStyleProp>;
    style?: MantineStyleProp;
}

export type DataTableActionType<T> = {
    name?: string,
    action: (record: T) => void;
    color?: string,
    permission?: Array<any>,
    icon: typeof IconHome2
}

interface DataTableActions<T> {
    actions?: Array<DataTableActionType<T>>
}

export type AppDataTableProps<T> = {
    records: Array<T>,
    isLoading: boolean,
    onChange?: () => void,
    count:number,
    onPageChanges?: (p: number) => void
}