import { useState } from "react";
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

import classes from "./ParagraphTexts.module.css";
import { IconClipboard, IconCopy, IconPlaylistX } from "@tabler/icons-react";
import useParagraphStore from "./store";

export default function ParagraphTexts() {
  const model = useParagraphStore((state) => state.model);
  const request = useParagraphStore((state) => state.request);
  const isTranslating = useParagraphStore((state) => state.isTranslating);
  const translatedText = useParagraphStore((state) => state.translatedText);
  const confidenceScore = useParagraphStore((state) => state.confidenceScore);
  const setOriginalText = useParagraphStore((state) => state.setOriginalText);
  const startTranslation = useParagraphStore((state) => state.startTranslation);

  const canTranslate: boolean =
    model !== "" &&
    request.sourceLang !== "" &&
    request.targetLang !== "" &&
    request.text !== "";

  return (
    <>
      <Box pos="relative">
        <Textarea
          placeholder="Original text"
          autosize
          minRows={10}
          value={request.text}
          onChange={(event) => setOriginalText(event.currentTarget.value)}
        ></Textarea>
        <Group gap="xs" className={classes["bottom-right-actions"]}>
          <AnnotatedIconButton
            tooltip="Paste from clipboard"
            onClick={() => navigator.clipboard.readText().then(setOriginalText)}
          >
            <IconClipboard className={classes["action-icon"]}></IconClipboard>
          </AnnotatedIconButton>
          <AnnotatedIconButton
            tooltip="Remove all text"
            onClick={() => setOriginalText("")}
          >
            <IconPlaylistX className={classes["action-icon"]}></IconPlaylistX>
          </AnnotatedIconButton>
        </Group>
      </Box>
      <Button
        className={classes["translate-button"]}
        loading={isTranslating}
        onClick={startTranslation}
        disabled={!canTranslate}
      >
        Translate
      </Button>
      <Box pos="relative">
        <LoadingOverlay
          visible={isTranslating && translatedText === ""}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ type: "dots" }}
        />
        <Textarea
          variant="filled"
          placeholder="Translated text"
          disabled
          autosize
          minRows={10}
          value={translatedText}
        ></Textarea>
        <Box className={classes["bottom-left"]}>
          {confidenceScore != null && (
            <Text c="dimmed" size="sm">
              Confidence: {confidenceScore.toFixed(2)}
            </Text>
          )}
        </Box>
        <Box className={classes["bottom-right-actions"]}>
          <AnnotatedIconButton
            tooltip="Copy to clipboard"
            popover="Copied!"
            onClick={() => navigator.clipboard.writeText(translatedText)}
          >
            <IconCopy className={classes["action-icon"]}></IconCopy>
          </AnnotatedIconButton>
        </Box>
      </Box>
    </>
  );
}

interface AnnotatedIconButtonProps {
  popover?: string;
  tooltip: string;
  onClick: () => void;
  children: JSX.Element;
}

function AnnotatedIconButton({
  popover = "",
  tooltip,
  onClick,
  children,
}: AnnotatedIconButtonProps) {
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
