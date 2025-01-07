import { Box, Button, Center, Group, Stack, Text } from "@mantine/core";
import { IconUpload, IconPhoto } from "@tabler/icons-react";
import { Dropzone, FileWithPath } from "@mantine/dropzone";
import classes from "./index.module.css";

export default function ProjectSelect() {
  return (
    <Stack gap="xl">
      <Group justify="center" gap={100}>
        <Button className={classes["create-zone"]}>
          <Stack align="center" justify="center" h="100%">
            <IconUpload className={classes["big-icon"]} stroke={1.5} />
            <Text>Create new project</Text>
          </Stack>
        </Button>
        <ProjectFileDropZone onDrop={(f) => console.log("accepted file", f)} />
      </Group>
      <Text>You do not have any previous projects.</Text>
    </Stack>
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
