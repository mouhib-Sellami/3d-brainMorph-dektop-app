export interface Task {
    attempts: number
    created_at: date
    delete_when_finish: boolean
    executed_at: Date
    execution_time: string
    finished_at: Date
    id: number
    is_done: boolean
    max_attempts: number
    status: string
    task_type: string
    updated_at: Date
    uuid: string
}