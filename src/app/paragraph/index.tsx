import { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Grid, Center, Box, Modal, Code } from "@mantine/core";

import classes from "./index.module.css";
import ParagraphTexts from "./ParagraphTexts";
import useParagraphStore from "./store";
import ParagraphConfig from "./ParagraphConfig";

export default function Paragraph() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function initOllama() {
      try {
        await useParagraphStore.getState().initializeParams();
      } catch (e) {
        setIsOpen(true);
      }
    }
    initOllama();
  }, []);

  return (
    <>
      <Stack>
        <Text size="xl" fw={700}>
          Context-aware LLM Translator (CALT)
        </Text>
        <Grid align="stretch">
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
        opened={isOpen}
        onClose={() => setIsOpen(false)}
        centered
        title="Error"
      >
        <Text>Ollama connection is not detected.</Text>
        <Text>
          If you already have ollama up and running, add this website to ollama
          allowed origins and start ollama in command line.
        </Text>
        <Text pt="md">For windows, run</Text>
        <Code block>set OLLAMA_ORIGINS=*{"\n"}ollama serve</Code>
      </Modal>
    </>
  );
}
