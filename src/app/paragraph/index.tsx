import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Grid, Center, Box, Modal, Group } from "@mantine/core";

import classes from "./index.module.css";
import ParagraphTexts from "./ParagraphTexts";
import useParagraphStore from "./store";
import ParagraphConfig from "./ParagraphConfig";
import useConfigStore from "../config/store";

export default function Paragraph() {
  const version = useConfigStore((state) => state.version);
  const alertInvalidHost = useConfigStore((state) => state.alertInvalidHost);
  const closeInvalidAlert = useConfigStore((state) => state.closeInvalidAlert);

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
          {/* <Grid.Col span={0.5} /> */}
          <Grid.Col span={4}>
            <Stack>
              <ParagraphConfig></ParagraphConfig>
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
      <Modal
        opened={alertInvalidHost}
        onClose={closeInvalidAlert}
        centered
        title="Error"
      >
        <Text>Ollama connection is not detected.</Text>
        <Text>Please make sure your ollama instance is running.</Text>
      </Modal>
    </>
  );
}
