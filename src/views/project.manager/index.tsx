import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import classes from "./index.module.css";
import { useDisclosure } from "@mantine/hooks";
import CreateProjectModal from "./CreateProjectModal";

export default function ProjectManager() {
  const [isOpenCreate, { open, close: closeCreate }] = useDisclosure(false);

  return (
    <>
      <Stack gap="xl">
        <Group justify="center" gap={100}>
          <Button className={classes["create-zone"]} onClick={open}>
            <Stack align="center" justify="center" h="100%">
              <IconUpload className={classes["big-icon"]} stroke={1.5} />
              <Text>Create new project</Text>
            </Stack>
          </Button>
          <ProjectFileDropZone
            onDrop={(f) => console.log("accepted file", f)}
          />
        </Group>
        <Text>You do not have any previous projects.</Text>
      </Stack>
      <Modal opened={isOpenCreate} onClose={closeCreate} title="Create project">
        <CreateProjectModal></CreateProjectModal>
      </Modal>
    </>
  );
}

function ProjectFileDropZone({
  onDrop,
}: {
  onDrop: (file: FileWithPath) => void;
}) {
  return (
    <Dropzone
      className={classes.dropzone}
      styles={{ inner: { height: "100%" } }}
      onDrop={(files) => onDrop(files[0])}
      multiple={false}
    >
      <Stack align="center" justify="center" h="100%">
        <Dropzone.Idle>
          <IconPhoto className={classes["big-icon"]} stroke={1.5} />
        </Dropzone.Idle>
        <Dropzone.Accept>
          <IconUpload className={classes["big-icon"]} stroke={1.5} />
        </Dropzone.Accept>

        <Text>Drag file here</Text>
      </Stack>
    </Dropzone>
  );
}
