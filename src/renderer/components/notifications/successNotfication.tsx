import React from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

const successNotfication = (props: ErrorRenderInterface) => {
    return notifications.show({
        title: 'Success',
        color: "green",
        message: props.content,
        autoClose: 2500,
        onClose: () => props.onClose(),
        icon: <IconCheck />,

    });
}

export default successNotfication;