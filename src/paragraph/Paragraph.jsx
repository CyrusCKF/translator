import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Grid, Center, Box, Modal, Code } from "@mantine/core";

import classes from "./Paragraph.module.css";
import ParagraphResults from "./ParagraphResults";
import ParagraphConfig from "./ParagraphConfig";
import useParagraphStore from "./ParagraphStore";

export default function Paragraph() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function testOllama() {
      try {
        await useParagraphStore.getState().getModels();
      } catch (e) {
        setIsOpen(true);
      }
    }
    testOllama();
  }, []);

  return (
    <>
      <Stack>
        <Text size="xl" fw={700}>
          Ollama translation
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
            <ParagraphResults></ParagraphResults>
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
