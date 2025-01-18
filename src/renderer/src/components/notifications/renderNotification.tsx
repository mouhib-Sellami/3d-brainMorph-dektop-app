import errorNotification from "./errorNotification";
import warningNotification from "./warningNotification";
import infoNotification from "./infoNotficiation";

const renderNotification = (props: any) => {
    switch (props.notification.level) {
        case 'ERROR':
            errorNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "WARNING":
            warningNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "ALERT":
            infoNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        default:
            infoNotification({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
    }
}

export default renderNotification;