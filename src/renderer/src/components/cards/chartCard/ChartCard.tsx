import { Box, Card, Title, useMantineTheme } from "@mantine/core";
import CustomLoadingOverlay from "@renderer/components/customLoading/CustomLoadingOverlay";
import React, { PropsWithChildren } from "react";

export interface ChartCardProps extends PropsWithChildren {
    title: string,
    isLoading: boolean
}
const ChartCard: React.FC<ChartCardProps> = ({ title, isLoading, children }) => {
    const { colors } = useMantineTheme();

    return (
        <Box
            p={2}
            style={{
                background: colors.primary[9],
                borderRadius: 10
            }}
        >
            {isLoading && <CustomLoadingOverlay />}
            <Title order={5} px={"md"} py={"sm"} c={"white"}>{title}</Title>
            <Card>
                <Card.Section p={"md"} style={{ background: colors.secondary[9], borderRadius: 8 }}>
                    {children}
                </Card.Section>
            </Card>
        </Box>
    )
}
export default ChartCard;