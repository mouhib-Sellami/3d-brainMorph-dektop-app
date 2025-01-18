import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import React from "react";



const useDeleteConfirmModal = () => {

    const displayDeleteConfirmModal = React.useCallback((onConfirm_, onCancel_) => {
        modals.openConfirmModal({
            title: 'Please confirm your action',
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