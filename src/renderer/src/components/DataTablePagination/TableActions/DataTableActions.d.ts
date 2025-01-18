interface DataTableActions<T> {
    onDelete: (record: t) => void,
    onUpdate: (record: T) => void,
    onSelect: (record: T) => void,
}