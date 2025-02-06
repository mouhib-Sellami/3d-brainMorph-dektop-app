import { createSlice } from "@reduxjs/toolkit";
import renderModal from "@renderer/components/modals/appModals/renderModal";
import renderNotification from "@renderer/components/notifications/renderNotification";

const initialState: errorInitialStateType = {
    isVisible: false,
    content: "",
    type: "",
    level: "ALERT",
    render: "MODAL"
};
export const renderError = (state) => {
    switch (state.render) {
        case "NOTIFICATION":
            renderNotification({ notification: { ...state }, onClose: () => { } })
            break;
        case "MODAL":
            renderModal({ notification: { ...state }, onClose: () => { } });
    }
}
const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        resetErrorHandler: (state) => {
            state.isVisible = false;
            state.content = "";
            state.type = "";
            state.level = "ALERT";
        },

        onError: (state, action: ErrorActionPayload) => {
            state.isVisible = true;
            state.content = action.payload.content;
            state.type = action.payload.type;
            state.level = action.payload.level;
            state.render = action.payload.render || 'MODAL'
            renderError(state)
        }
    },
});

export const { resetErrorHandler, onError } = errorSlice.actions;

export default errorSlice.reducer;
