import { Box } from "@mantine/core";
import { PropsWithChildren } from "react";

const ContentWrapper: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box m={0} p={"md"} mb={"md"} w={"100%"} bg={"dark"} style={{
            borderRadius:10,
        }}>
            {children}
        </Box>
    )
}

export default ContentWrapper;