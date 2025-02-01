import React from "react";
import { RouteProps } from "react-router-dom";
import { Socket, io } from "socket.io-client"

type SocketContextProps = {
    isConnected: boolean;
    socket: Socket | null
}

const SocketContext = React.createContext<Partial<SocketContextProps>>({})

const SocketProvider = (props: RouteProps) => {
    const [socket, setSocket] = React.useState<Socket | null>(null);
    const [isConnected, setIsConnected] = React.useState(false);
    React.useEffect(() => {
        if (socket) {
            socket.removeAllListeners()
            socket.close()
        }
        const client = io(import.meta.env.VITE_SOCKET_SERVER, {
            forceNew: true,

        })
        setSocket(client)
        return () => {
            if (socket) {
                socket.removeAllListeners()
                socket.close()
            }
        }
    }, [])
    React.useEffect(() => {
        if (socket) {
            socket.on('connect', () => {
                setIsConnected(true)
                console.log("Connected to socket");
            })
            socket.on("error", (error) => {
                console.log("socket error");
                console.log(error);
            })
            socket.on('disconnect', _ => {
                console.log("disconnect");
                setIsConnected(false)
                setSocket(null)
            })
            socket.on("connect_error", (err) => {
                setIsConnected(false)
                console.log(err);
            })
            return () => {
                if (socket) {
                    socket.removeAllListeners()
                    socket.close()
                }
            }
        }
        return
    }, [socket])
    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {props.children}
        </SocketContext.Provider>
    )
};
const SocketConsumer = SocketContext.Consumer
export { SocketContext, SocketProvider, SocketConsumer };