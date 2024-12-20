import React from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Textarea, TextInput, Group, Select } from "@mantine/core";

import classes from "./Paragraph.module.css";

export default function Paragraph() {
  return (
    <Stack>
      <Text size="xl" fw={700}>
        PARAGRAPH
      </Text>
      <Group justify="space-between">
        <Text>Model</Text>
        <Select placeholder="Pick value" data={["llama3:latest"]}></Select>
      </Group>
      <Stack>
        <Text>Context</Text>
        <Textarea
          placeholder="Input context to enhance translation quality"
          autosize
          minRows={4}
          maxRows={8}
        ></Textarea>
      </Stack>
      <Stack>
        <Text>Examples</Text>
        <div>
          <Text size="sm" pb="xs">
            Pair 1
          </Text>
          <TextInput
            classNames={{
              input: classes["input-top"],
            }}
          ></TextInput>
          <TextInput
            classNames={{
              input: classes["input-bottom"],
            }}
          ></TextInput>
        </div>
      </Stack>
    </Stack>
  );
}
