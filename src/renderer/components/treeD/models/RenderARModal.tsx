import { Card, Grid, Modal } from "@mantine/core";
import AR from "@renderer/components/cards/AR";

export interface RenderARModalProps extends BaseModalProps {
    model_path: string
}


const RenderARModal: React.FC<RenderARModalProps> = ({ model_path, isVisible, onClose }) => {

    return (
        <Modal
            opened={isVisible}
            onClose={onClose}
            fullScreen
            radius={0}
            m={0}
            transitionProps={{ transition: 'fade', duration: 200 }}
        >
            <Grid>
                <Grid.Col span={12} mih={"90vh"}>
                    <Card bg="black" w={"100%"} h={"100%"} p={0} m={0}>
                        <AR model_path={model_path} />
                    </Card>
                </Grid.Col>
            </Grid>
        </Modal>
    )
}

export default RenderARModal;