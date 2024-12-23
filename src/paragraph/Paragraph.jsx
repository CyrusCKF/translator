import React, { useEffect, useState } from "react";
import "@mantine/core/styles.css";
import {
  Text,
  Stack,
  Textarea,
  TextInput,
  Group,
  Select,
  Button,
  Grid,
  Center,
  LoadingOverlay,
  Box,
  ActionIcon,
  Tooltip,
  Modal,
  Popover,
} from "@mantine/core";

import classes from "./Paragraph.module.css";
import { IconClipboard, IconCopy, IconPlaylistX } from "@tabler/icons-react";
import useParagraphStore from "./ParagraphStore";

export default function Paragraph() {
  return (
    <Stack>
      <Text size="xl" fw={700}>
        PARAGRAPH
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

function ParagraphConfig() {
  const paragraphStore = useParagraphStore();
  useEffect(() => {
    paragraphStore.getModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Group justify="space-between">
        <Text>Model</Text>
        <Select
          data={useParagraphStore((state) => state.availableModels)}
          onChange={useParagraphStore((state) => state.setModel)}
        ></Select>
      </Group>
      <Group justify="space-between">
        <Text pr="md">Languages</Text>
        <Group>
          <Select
            data={["English", "Spanish"]}
            w="7rem"
            searchable
            onChange={useParagraphStore((state) => state.setFromLanguage)}
          ></Select>
          <Text>to</Text>
          <Select
            data={["English", "Spanish"]}
            w="7rem"
            searchable
            onChange={useParagraphStore((state) => state.setToLanguage)}
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
          onChange={(e) => paragraphStore.setContext(e.currentTarget.value)}
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
    </>
  );
}

function ParagraphResults() {
  const paragraphStore = useParagraphStore();
  const canTranslate =
    paragraphStore.model !== "" &&
    paragraphStore.fromLanguage !== "" &&
    paragraphStore.toLanguage !== "" &&
    paragraphStore.originalText !== "";

  return (
    <>
      <Box pos="relative">
        <Textarea
          placeholder="Original text"
          autosize
          minRows={10}
          value={useParagraphStore((state) => state.originalText)}
          onChange={(e) =>
            paragraphStore.setOriginalText(e.currentTarget.value)
          }
        ></Textarea>
        <Group gap="xs" className={classes["bottom-right-actions"]}>
          <Tooltip label="Paste from clipboard">
            <ActionIcon
              variant="subtle"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                paragraphStore.setOriginalText(text);
              }}
            >
              <IconClipboard className={classes["action-icon"]}></IconClipboard>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Remove all text">
            <ActionIcon
              variant="subtle"
              onClick={() => paragraphStore.setOriginalText("")}
            >
              <IconPlaylistX className={classes["action-icon"]}></IconPlaylistX>
            </ActionIcon>
          </Tooltip>
        </Group>
      </Box>
      <Button
        className={classes["translate-button"]}
        loading={useParagraphStore((state) => state.isTranslating)}
        onClick={useParagraphStore((state) => state.startTranslation)}
        disabled={!canTranslate}
      >
        Translate
      </Button>
      <Box pos="relative">
        <LoadingOverlay
          visible={useParagraphStore(
            (state) => state.isTranslating && state.translatedText === ""
          )}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ type: "dots" }}
        />
        <Textarea
          variant="filled"
          placeholder="Translated text"
          disabled
          autosize
          minRows={10}
          value={useParagraphStore((state) => state.translatedText)}
        ></Textarea>
        <Box className={classes["bottom-right-actions"]}>
          <AnnotatedIconButton
            tooltip="Copy to clipboard"
            popover="Copied!"
            onClick={() =>
              navigator.clipboard.writeText(paragraphStore.translatedText)
            }
          >
            <IconCopy className={classes["action-icon"]}></IconCopy>
          </AnnotatedIconButton>
        </Box>
      </Box>
    </>
  );
}

function AnnotatedIconButton({ popover, tooltip, onClick, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleButtonClick() {
    onClick();
    setIsOpen(!isOpen);
  }

  return (
    <Popover opened={isOpen} onChange={setIsOpen}>
      <Popover.Target>
        <Tooltip label={tooltip}>
          <ActionIcon variant="subtle" onClick={handleButtonClick}>
            {children}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Text>{popover}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
