import { Text, useMantineTheme } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";



const useDeleteConfirmModal = () => {
    const {colors} = useMantineTheme();

    const displayDeleteConfirmModal = React.useCallback((onConfirm_, onCancel_) => {
        modals.openConfirmModal({
            title: 'Please confirm your action',
            styles:{
                title:{
                    color:colors.primary[0]
                }
            },
            centered: true,
            children: (
                <Text size="sm">
                    Are you sure you want to proceed with this action?
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            confirmProps: { color: "red" },
            onCancel: async () => {
                await onCancel_()

            },
            onConfirm: async () => {
                await onConfirm_()
            },
        });
    }, [])

    return {
        displayDeleteConfirmModal
    }
}

export default useDeleteConfirmModal;