import React from "react";
import { Button, Group, Modal, SimpleGrid, Text, Title } from "@mantine/core";
import { Patient } from "@renderer/types/Patient";
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { TIFFViewer } from 'react-tiff'
import usePatients from "@renderer/hooks/usePatients";
import { dispatch } from "@renderer/redux/store";
import { uploadPatient } from "@renderer/redux/slices/patientSlice";

export interface UploadPatientImagesModalProps extends BaseModalProps {
    patient: Patient,
    onUpload: () => void
}

const UploadPatientImagesModal: React.FC<UploadPatientImagesModalProps> = (props) => {
    const [files, setFiles] = React.useState<FileWithPath[]>([]);
    const { isLoading } = usePatients()
    const previews = files.slice(0, 10).map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <TIFFViewer
            tiff={imageUrl}
            key={index}
            style={{ width: 75, height: 75, }}
        />;
    });

    const submit = React.useCallback(async () => {
        if (!props.patient)
            return
        const formData = new FormData()
        files.map(elm => {
            formData.append('files', elm)
        })
        const res = await dispatch(uploadPatient({
            data: formData,
            id: props.patient.id || 0
        }))
        if (res.meta.requestStatus == "fulfilled") {
            props.onUpload()
        }

    }, [files, props.patient])
    return (
        <Modal size="xl"
            closeOnClickOutside
            opened={props.isVisible}
            onClose={props.onClose}
            centered>
            <Title style={{ textAlign: "center" }} order={3}>Upload Patient</Title>
            <Dropzone
                loading={isLoading}
                mt={"md"}
                onDrop={setFiles}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                {...props}
            >

                {files.length > 0 && <SimpleGrid cols={{ base: 1, sm: 6 }} mt={previews.length > 0 ? 'xl' : 0}>
                    {previews}
                </SimpleGrid>}
                {files.length == 0 && (
                    <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }} >
                        <Dropzone.Accept>
                            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                        </Dropzone.Idle>
                        <div>
                            <Text size="xl" inline>
                                Drag images here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Attach as many files as you like, each file should not exceed 5mb
                            </Text>
                        </div>
                    </Group>
                )}
            </Dropzone>

            <Group justify="center" mt="md">
                <Button type="submit" fullWidth loading={isLoading} onClick={submit}>Submit</Button>
            </Group>
        </Modal>

    )
}

export default UploadPatientImagesModal;