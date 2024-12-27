/* eslint-disable react/prop-types */
// eslint-disable react-hooks/exhaustive-deps
import React, { useEffect } from "react";
import "@mantine/core/styles.css";
import {
  Text,
  Stack,
  Textarea,
  TextInput,
  Group,
  Select,
  Box,
  ActionIcon,
  Switch,
  HoverCard,
} from "@mantine/core";

import classes from "./ParagraphConfig.module.css";
import useParagraphStore from "./ParagraphStore";
import { useShallow } from "zustand/shallow";
import {
  IconLayoutGridAdd,
  IconQuestionMark,
  IconTrashX,
} from "@tabler/icons-react";
import LANGUAGES from "../shared/Languages";

export default function ParagraphConfig() {
  const store = useParagraphStore(
    useShallow((state) => ({
      getModels: state.getModels,
      availableModels: state.availableModels,
      fromLanguage: state.fromLanguage,
      toLanguage: state.toLanguage,
      useRefinement: state.useRefinement,
      examples: state.examples,
      setModel: state.setModel,
      setFromLanguage: state.setFromLanguage,
      setToLanguage: state.setToLanguage,
      setUseRefinement: state.setUseRefinement,
      setContext: state.setContext,
      addExample: state.addExample,
      removeExampleAt: state.removeExampleAt,
      modifyExampleAt: state.modifyExampleAt,
    }))
  );

  useEffect(() => {
    store.getModels();
  }, []);

  return (
    <>
      <Group justify="space-between">
        <Text>
          Model
          <Text c="red" span inherit>
            *
          </Text>
        </Text>

        <Select data={store.availableModels} onChange={store.setModel}></Select>
      </Group>
      <Group justify="space-between">
        <Text pr="md">
          Languages
          <Text c="red" span inherit>
            *
          </Text>
        </Text>
        <Group>
          <Select
            data={LANGUAGES}
            w="7rem"
            searchable
            onChange={store.setFromLanguage}
          ></Select>
          <Text>to</Text>
          <Select
            data={LANGUAGES}
            w="7rem"
            searchable
            onChange={store.setToLanguage}
          ></Select>
        </Group>
      </Group>
      <Group justify="space-between">
        <Group>
          <Text>Refine results</Text>
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <IconQuestionMark>Hover to reveal the card</IconQuestionMark>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm">
                Analyze and edit the raw translation results. Uses
                about 3x time.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Switch
          checked={store.useRefinement}
          onChange={(event) =>
            store.setUseRefinement(event.currentTarget.checked)
          }
        />
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
        {store.examples.map((e, i) => (
          <ConfigExample
            key={`${i}`}
            description={`Pair ${i + 1}`}
            lang1={store.fromLanguage}
            lang2={store.toLanguage}
            onText1Change={(text) => store.modifyExampleAt(i, text, null)}
            onText2Change={(text) => store.modifyExampleAt(i, null, text)}
            onRemove={() => store.removeExampleAt(i)}
          ></ConfigExample>
        ))}
        <ActionIcon
          variant="subtle"
          size="sm"
          w="100%"
          onClick={store.addExample}
        >
          <IconLayoutGridAdd></IconLayoutGridAdd>
        </ActionIcon>
      </Stack>
    </>
  );
}

function ConfigExample({
  description,
  lang1,
  lang2,
  onRemove,
  onText1Change,
  onText2Change,
}) {
  const topSection = <Text size="xs">{lang1.slice(0, 2)}</Text>;
  const bottomSection = <Text size="xs">{lang2.slice(0, 2)}</Text>;

  return (
    <Box>
      <Group justify="space-between" pb="xs">
        <Text size="xs">{description}</Text>
        <ActionIcon variant="subtle" size="sm" onClick={onRemove}>
          <IconTrashX width="70%"></IconTrashX>
        </ActionIcon>
      </Group>
      <TextInput
        classNames={{ input: classes["input-top"] }}
        leftSection={topSection}
        onChange={(e) => onText1Change(e.currentTarget.value)}
      ></TextInput>
      <TextInput
        classNames={{ input: classes["input-bottom"] }}
        leftSection={bottomSection}
        onChange={(e) => onText2Change(e.currentTarget.value)}
      ></TextInput>
    </Box>
  );
}
