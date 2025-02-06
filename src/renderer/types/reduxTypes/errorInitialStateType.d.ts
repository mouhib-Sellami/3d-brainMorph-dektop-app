interface errorInitialStateType {
    content: string,
    isVisible?: boolean,
    type: "AUTH" | "NETWORK" | string,
    level: "ERROR" | "WARNING" | "ALERT",
    render?: "NOTIFICATION" | "MODAL"
}
interface ErrorActionPayload {
    payload: errorInitialStateType
}
