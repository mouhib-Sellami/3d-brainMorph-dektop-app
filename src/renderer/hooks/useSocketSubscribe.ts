import React from "react"
import { SocketContext } from "@renderer/contexts/SocketContext"

export const useSocketSubscribe = (eventName: string, eventHandler: (...args: any) => void) => {
    const { socket, isConnected } = React.useContext(SocketContext)
    React.useEffect(() => {
        if (isConnected)
            socket?.on(eventName, eventHandler)
        return () => {
            socket?.off(eventName, eventHandler)
        }
    }, [eventHandler, eventName, isConnected])
}