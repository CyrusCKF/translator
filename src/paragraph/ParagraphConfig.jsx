import React, { useEffect } from "react";
import "@mantine/core/styles.css";
import { Text, Stack, Textarea, TextInput, Group, Select } from "@mantine/core";

import classes from "./ParagraphConfig.module.css";
import useParagraphStore from "./ParagraphStore";
import { useShallow } from "zustand/shallow";

export default function ParagraphConfig() {
  const store = useParagraphStore(
    useShallow((state) => ({
      getModels: state.getModels,
      availableModels: state.availableModels,
      setModel: state.setModel,
      setFromLanguage: state.setFromLanguage,
      setToLanguage: state.setToLanguage,
      setContext: state.setContext,
    }))
  );

  useEffect(() => {
    store.getModels();
  }, []);

  return (
    <>
      <Group justify="space-between">
        <Text>Model</Text>
        <Select data={store.availableModels} onChange={store.setModel}></Select>
      </Group>
      <Group justify="space-between">
        <Text pr="md">Languages</Text>
        <Group>
          <Select
            data={["English", "Spanish"]}
            w="7rem"
            searchable
            onChange={store.setFromLanguage}
          ></Select>
          <Text>to</Text>
          <Select
            data={["English", "Spanish"]}
            w="7rem"
            searchable
            onChange={store.setToLanguage}
          ></Select>
        </Group>
      </Group>
      <Stack>
        <Text>Context</Text>
        <Textarea
          placeholder="Input context to enhance translation quality"
          autosize
          minRows={4}
          maxRows={8}
          onChange={(e) => store.setContext(e.currentTarget.value)}
        ></Textarea>
      </Stack>
      <Stack>
        <Text>Examples</Text>
        <div>
          <Text size="xs" pb="xs">
            Pair 1
          </Text>
          <TextInput classNames={{ input: classes["input-top"] }}></TextInput>
          <TextInput
            classNames={{ input: classes["input-bottom"] }}
          ></TextInput>
        </div>
      </Stack>
    </>
  );
}
