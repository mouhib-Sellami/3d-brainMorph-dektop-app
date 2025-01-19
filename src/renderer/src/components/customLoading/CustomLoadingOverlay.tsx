import { Box, LoadingOverlay } from "@mantine/core";
import Logo from "../dotLottie/Logo";

const CustomLoadingOverlay = () => {
    return (
        <LoadingOverlay
            visible
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}

            loaderProps={{
                children: <Box h={200} w={200}><Logo /></Box>
            }}
        />
    )
}


export default CustomLoadingOverlay;