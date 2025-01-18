type Role = {
    id?: number,
    name: string,
    slug?: string,
    active?: boolean,
    permissions: Array<Permission>
}