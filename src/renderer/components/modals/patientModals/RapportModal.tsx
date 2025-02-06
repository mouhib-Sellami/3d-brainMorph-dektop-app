
import { ActionIcon, Button, Drawer, Flex, Group, Modal, ScrollArea, Text, Title } from "@mantine/core";

import React from "react";
import PdfViewer from "./PdfViewer";
import { IconArrowLeftFromArc, IconArrowRightFromArc, IconRefresh } from "@tabler/icons-react";



export interface RapportModalProps extends BaseModalProps {
    pdf_path: string,
}

const RapportModal: React.FC<RapportModalProps> = (props) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [numPages, setNumPages] = React.useState(1);
    const nextPage = () =>
        currentPage < numPages && setCurrentPage(currentPage + 1);
    const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

    console.log("props.pdf_path");
    console.log(props.pdf_path);

    return (
        <Drawer
        translate="yes"
        
        size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            h={"100%"}
           
            title={
                <Group w={"100%"} align="center" justify="space-between">
                    <Title style={{ textAlign: "center" }} order={3}>Rapport</Title>
                    <Group>
                        <ActionIcon variant="outline" onClick={prevPage} disabled={currentPage <= 1}>
                            <IconArrowRightFromArc size={16} />
                        </ActionIcon>
                        <ActionIcon variant="outline" onClick={nextPage}
                            disabled={currentPage >= (numPages ?? -1)} >
                            <IconArrowLeftFromArc size={16} />
                        </ActionIcon>
                    </Group>
                </Group >
            }
        >
            <PdfViewer currentPage={currentPage} numberOfPages={(nb: number) => { setNumPages(nb) }} src={props.pdf_path} />

        </Drawer >
    )
}

export default RapportModal;
