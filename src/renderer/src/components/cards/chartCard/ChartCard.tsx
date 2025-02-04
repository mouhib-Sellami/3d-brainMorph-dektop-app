import { Box, Card, Title, useMantineTheme } from "@mantine/core";
import React, { PropsWithChildren } from "react";

export interface ChartCardProps extends PropsWithChildren {
    title: string,
}
const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
    const { colors } = useMantineTheme();

    return (
        <Box
            p={2}
            style={{
                background: colors.primary[9],
                borderRadius: 10
            }}
        >
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