import useAuth from "@/hooks/useAuth";
import useUsers from "@/hooks/useUsers";
import { onError } from "@/redux/slices/errorSlice";
import { createProject } from "@/redux/slices/projectSlice";
import { getUsers } from "@/redux/slices/userSlice";
import { dispatch } from "@/redux/store";
import { Project } from "@/types/Project";
import { Button, Code, Group, Modal, MultiSelect, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import "./style.scss"
import {
    vs,
    vs2015,
    arta,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { IconCopy } from "@tabler/icons-react";


export interface ViewCodeModalProps extends BaseModalProps {
    code: string
}

const ViewCodeModal: React.FC<ViewCodeModalProps> = (props) => {

    return (
        <Modal 
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            style={{ overflow: "scroll", width: "80%" }}
            
            size="xl"
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Terraform</Title>
            <div className="CodeBlockClass">

                <button className="CopyButtonClass">
                    <CopyToClipboard text={props.code} onCopy={() => alert("Copied!")}>
                        <div>
                            <IconCopy />
                        </div>
                    </CopyToClipboard>
                </button>
                <SyntaxHighlighter
                    language={"bash"}
                    style={vs}
                    
                    wrapLines={true}
                    wrapLongLines={true}
                    showLineNumbers={true}
                    showInlineLineNumbers={false}
                    customStyle={{
                        border: "1px solid #c3c3c3",
                        borderRadius: "5px",
                        padding: "0 20px",
                    }}
                >
                    {props.code}
                </SyntaxHighlighter>
            </div>

        </Modal>
    )
}

export default ViewCodeModal;
