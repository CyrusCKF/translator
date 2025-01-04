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
import {
  IconLayoutGridAdd,
  IconQuestionMark,
  IconTrashX,
} from "@tabler/icons-react";
import LANGUAGES from "../config/languages";
import useParagraphStore from "./store";
import useConfigStore from "../config/store";

export default function ParagraphConfig() {
  const availableModels = useParagraphStore((state) => state.availableModels);
  const request = useParagraphStore((state) => state.request);
  const useRefinement = useParagraphStore((state) => state.useRefinement);
  const setModel = useParagraphStore((state) => state.setModel);
  const setSourceLang = useParagraphStore((state) => state.setSourceLang);
  const setTargetLang = useParagraphStore((state) => state.setTargetLang);
  const setUseRefinement = useParagraphStore((state) => state.setUseRefinement);
  const setContext = useParagraphStore((state) => state.setContext);
  const addExample = useParagraphStore((state) => state.addExample);
  const removeExampleAt = useParagraphStore((state) => state.removeExampleAt);
  const modifyExampleAt = useParagraphStore((state) => state.modifyExampleAt);

  const host = useConfigStore((state) => state.host);
  const models = useConfigStore((state) => state.models);

  return (
    <>
      <Group justify="space-between">
        <Text>
          Host
          <Text c="red" span inherit>
            *
          </Text>
        </Text>
        <TextInput
          value={host}
          onChange={(event) => console.log(event.currentTarget.value)}
        ></TextInput>
      </Group>

      <Group justify="space-between">
        <Text>
          Model
          <Text c="red" span inherit>
            *
          </Text>
        </Text>
        <Select data={models} onChange={setModel}></Select>
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
            onChange={setSourceLang}
          ></Select>
          <Text>to</Text>
          <Select
            data={LANGUAGES}
            w="7rem"
            searchable
            onChange={setTargetLang}
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
                Analyze and edit the raw translation results. Takes
                approximately three times longer.
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
        </Group>
        <Switch
          checked={useRefinement}
          onChange={(event) => setUseRefinement(event.currentTarget.checked)}
        />
      </Group>

      <Stack>
        <Text>Context</Text>
        <Textarea
          placeholder="Input context to enhance translation quality"
          autosize
          minRows={4}
          maxRows={8}
          onChange={(event) => setContext(event.currentTarget.value)}
        ></Textarea>
      </Stack>

      <Stack>
        <Text>Examples</Text>
        {request.examples.map((_, i) => (
          <ConfigExample
            key={`${i}`}
            description={`Pair ${i + 1}`}
            lang1={request.sourceLang}
            lang2={request.targetLang}
            onText1Change={(text) => modifyExampleAt(i, text, undefined)}
            onText2Change={(text) => modifyExampleAt(i, undefined, text)}
            onRemove={() => removeExampleAt(i)}
          ></ConfigExample>
        ))}
        <ActionIcon variant="subtle" size="sm" w="100%" onClick={addExample}>
          <IconLayoutGridAdd></IconLayoutGridAdd>
        </ActionIcon>
      </Stack>
    </>
  );
}

interface ConfigExampleProps {
  description: string;
  lang1: string;
  lang2: string;
  onRemove: () => void;
  onText1Change: (text: string) => void;
  onText2Change: (text: string) => void;
}

function ConfigExample({
  description,
  lang1,
  lang2,
  onRemove,
  onText1Change,
  onText2Change,
}: ConfigExampleProps) {
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
