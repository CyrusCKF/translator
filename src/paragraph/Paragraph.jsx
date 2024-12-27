import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Grid, Center, Box, Modal } from "@mantine/core";

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
      <Modal opened={isOpen} onClose={() => setIsOpen(false)} centered>
        <Text>No ollama connection detected</Text>
      </Modal>
    </>
  );
}
