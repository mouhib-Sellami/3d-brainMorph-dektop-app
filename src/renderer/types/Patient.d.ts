export interface Patient {
    id?: number,
    first_name: string,
    last_name: string,
    folder_name?: string,
    is_generated: boolean,
    gender: "Male" | "Female",
    age: number,
    birth_date: Date | string
    has_files: boolean
    is_processing: boolean
    nii_file_path: string
    tumor_file_path: string
    brain_file_path: string
    brain_combine_file_path: string
    public_tumor: string
    public_brain: string
    public_combined_brain: string
    public_rapport: string
    rapport_file_path: string
}