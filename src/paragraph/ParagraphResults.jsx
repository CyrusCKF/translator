import React, { useState } from "react";
import "@mantine/core/styles.css";
import {
  Text,
  Textarea,
  Group,
  Button,
  LoadingOverlay,
  Box,
  ActionIcon,
  Tooltip,
  Popover,
} from "@mantine/core";

import classes from "./ParagraphResults.module.css";
import { IconClipboard, IconCopy, IconPlaylistX } from "@tabler/icons-react";
import useParagraphStore from "./ParagraphStore";
import { useShallow } from "zustand/shallow";

export default function ParagraphResults() {
  const store = useParagraphStore(
    useShallow((state) => ({
      model: state.model,
      fromLanguage: state.fromLanguage,
      toLanguage: state.toLanguage,
      originalText: state.originalText,
      setOriginalText: state.setOriginalText,
      isTranslating: state.isTranslating,
      startTranslation: state.startTranslation,
      translatedText: state.translatedText,
      confidenceScore: state.confidenceScore,
    }))
  );

  const canTranslate =
    store.model !== "" &&
    store.fromLanguage !== "" &&
    store.toLanguage !== "" &&
    store.originalText !== "";

  async function handlePaste() {
    const text = await navigator.clipboard.readText();
    store.setOriginalText(text);
  }

  return (
    <>
      <Box pos="relative">
        <Textarea
          placeholder="Original text"
          autosize
          minRows={10}
          value={store.originalText}
          onChange={(e) => store.setOriginalText(e.currentTarget.value)}
        ></Textarea>
        <Group gap="xs" className={classes["bottom-right-actions"]}>
          <AnnotatedIconButton
            tooltip="Paste from clipboard"
            onClick={handlePaste}
          >
            <IconClipboard className={classes["action-icon"]}></IconClipboard>
          </AnnotatedIconButton>
          <AnnotatedIconButton
            tooltip="Remove all text"
            onClick={() => store.setOriginalText("")}
          >
            <IconPlaylistX className={classes["action-icon"]}></IconPlaylistX>
          </AnnotatedIconButton>
        </Group>
      </Box>
      <Button
        className={classes["translate-button"]}
        loading={store.isTranslating}
        onClick={store.startTranslation}
        disabled={!canTranslate}
      >
        Translate
      </Button>
      <Box pos="relative">
        <LoadingOverlay
          visible={store.isTranslating && store.translatedText === ""}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ type: "dots" }}
        />
        <Textarea
          variant="filled"
          placeholder="Translated text"
          disabled
          autosize
          minRows={10}
          value={store.translatedText}
        ></Textarea>
        <Box className={classes["bottom-left"]}>
          {store.confidenceScore != null && (
            <Text c="dimmed" size="sm">
              Confidence: {store.confidenceScore.toFixed(2)}
            </Text>
          )}
        </Box>
        <Box className={classes["bottom-right-actions"]}>
          <AnnotatedIconButton
            tooltip="Copy to clipboard"
            popover="Copied!"
            onClick={() => navigator.clipboard.writeText(store.translatedText)}
          >
            <IconCopy className={classes["action-icon"]}></IconCopy>
          </AnnotatedIconButton>
        </Box>
      </Box>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function AnnotatedIconButton({ popover = "", tooltip, onClick, children }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleButtonClick() {
    onClick();
    setIsOpen(!isOpen);
  }

  const withTooltip = (
    <Tooltip label={tooltip}>
      <ActionIcon variant="subtle" onClick={handleButtonClick}>
        {children}
      </ActionIcon>
    </Tooltip>
  );
  if (popover === "") return withTooltip;

  return (
    <Popover opened={isOpen} onChange={setIsOpen}>
      <Popover.Target>{withTooltip}</Popover.Target>
      <Popover.Dropdown>
        <Text>{popover}</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
