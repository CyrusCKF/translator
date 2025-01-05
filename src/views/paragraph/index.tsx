import "@mantine/core/styles.css";
import {
  Text,
  Stack,
  Grid,
  Center,
  Box,
  Modal,
  Group,
  TextInput,
  Button,
} from "@mantine/core";

import classes from "./index.module.css";
import ParagraphTexts from "./ParagraphTexts";
import ParagraphOptions from "./ParagraphOptions";
import useSettingsStore from "../../stores/settings";
import { useState } from "react";

export default function Paragraph() {
  const version = useSettingsStore((state) => state.version);

  return (
    <>
      <Stack>
        <Group justify="space-between">
          <Text size="xl" fw={700}>
            Context-Aware LLM Translator
          </Text>
          <Text c="dimmed">Version {version}</Text>
        </Group>
        <Grid align="stretch">
          <Grid.Col span={4}>
            <Stack>
              <ParagraphOptions></ParagraphOptions>
            </Stack>
          </Grid.Col>
          <Grid.Col span={1}>
            <Center h="100%">
              <Box className={classes["vertical-divider"]}></Box>
            </Center>
          </Grid.Col>
          <Grid.Col span={5}>
            <ParagraphTexts></ParagraphTexts>
          </Grid.Col>
        </Grid>
      </Stack>
      <ConnectionErrorModal></ConnectionErrorModal>
    </>
  );
}

function ConnectionErrorModal() {
  const configHost = useSettingsStore((state) => state.host);
  const updateHost = useSettingsStore((state) => state.updateHost);
  const alertInvalidHost = useSettingsStore((state) => state.alertInvalidHost);
  const closeInvalidAlert = useSettingsStore((state) => state.closeInvalidAlert);

  const [host, setHost] = useState(configHost);
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <Modal
      opened={alertInvalidHost}
      onClose={closeInvalidAlert}
      centered
      title="Connection error"
    >
      <Stack>
        <Text>
          Please make sure Ollama is running. You can also change
          the host below.
        </Text>
        <Group justify="space-between">
          <Text>Host</Text>
          <TextInput
            value={host}
            onChange={(event) => setHost(event.currentTarget.value)}
            error={alertInvalidHost && !isUpdating}
          ></TextInput>
          <Button
            onClick={async () => {
              setIsUpdating(true);
              await updateHost(host);
              setIsUpdating(false);
            }}
            disabled={isUpdating}
            loading={isUpdating}
          >
            Update
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
