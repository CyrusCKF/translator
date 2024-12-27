import React from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Grid, Center, Box } from "@mantine/core";

import classes from "./Paragraph.module.css";
import ParagraphResults from "./ParagraphResults";
import ParagraphConfig from "./ParagraphConfig";

export default function Paragraph() {
  return (
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
  );
}
