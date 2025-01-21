export interface Patient {
    id?: number,
    first_name: string,
    last_name: string,
    folder_name?: string,
    is_generated: boolean,
    gender: "Male" | "Female",
    age: number,
    birth_date: Date
    has_files: boolean
}