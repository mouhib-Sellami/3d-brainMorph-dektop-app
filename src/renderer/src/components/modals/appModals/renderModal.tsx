import AlertModal from "./AlertModal";
import errorModal from "./errorModal";
import WarningModal from "./WarningModal";


const renderModal = (props: any) => {
    
    switch (props.notification.level) {
        case 'ERROR':
            errorModal({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        case "WARNING":
            WarningModal({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
        default:
            AlertModal({
                content: props.notification.content, onClose: () => {
                    props.onClose()
                }
            })
            break;
    }
}

export default renderModal